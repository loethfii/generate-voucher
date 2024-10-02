import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  ArrayGenerateVoucher,
  GenerateVoucherDto,
  UpdateVoucher,
} from 'src/dto/generate-voucher.dto';
import { PrismaService } from 'src/prisma.service';
import { generateUniqueCode } from 'src/utils';

@Injectable()
export class VoucherService {
  constructor(private prisma: PrismaService) {}

  async generateVoucher(body: GenerateVoucherDto) {
    try {
      const data = await this.prisma.$transaction(
        async (tx) => {
          const createMasterVoucherRes = await tx.master_voucher.create({
            data: {
              name: body.voucher_name,
              amount: body.amount,
              start_date: new Date(body.start_date),
              end_date: new Date(body.end_date),
            },
          });
          if (!createMasterVoucherRes) {
            throw new BadRequestException('Failed to generate voucher');
          }
          const generateVoucher: ArrayGenerateVoucher[] = [];

          for (let i = 0; i < body.num_generations; i++) {
            generateVoucher.push({
              code: generateUniqueCode(body.char_length),
              voucher_id: createMasterVoucherRes.id,
            });
          }

          if (generateVoucher.length > 30000) {
            const chunkSize = 30000;
            const chunkData = [];
            for (let i = 0; i < generateVoucher.length; i += chunkSize) {
              chunkData.push(generateVoucher.slice(i, i + chunkSize));
            }
            const responseInsertChunk: any[] = [];
            for (const chunk of chunkData) {
              await this.checkingDuplicateGenerateVoucher(chunk);
              const uvcGenerate = await tx.uvcvoucher.createMany({
                data: chunk,
                skipDuplicates: true,
              });
              responseInsertChunk.push(uvcGenerate);
            }

            return responseInsertChunk;
          }

          await this.checkingDuplicateGenerateVoucher(generateVoucher);

          const uvcGenerate = await tx.uvcvoucher.createMany({
            data: generateVoucher,
            skipDuplicates: true,
          });

          return uvcGenerate;
        },
        {
          timeout: 60000,
        },
      );

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateVoucherCode(voucher_id: string, body: UpdateVoucher) {
    console.log(voucher_id);
    const data = await this.prisma.$transaction(
      async (tx) => {
        const updateVoucherCode = await tx.master_voucher.update({
          where: {
            id: voucher_id,
          },
          data: {
            name: body.voucher_name,
            amount: body.amount,
            start_date: new Date(body.start_date),
            end_date: new Date(body.end_date),
          },
        });

        if (!updateVoucherCode) {
          throw new BadRequestException('Failed to generate voucher');
        }

        const countVoucherUvc = await tx.uvcvoucher.count({
          where: {
            voucher_id: updateVoucherCode.id,
          },
        });
        const generateVoucher: ArrayGenerateVoucher[] = [];

        for (let i = 0; i < countVoucherUvc; i++) {
          generateVoucher.push({
            code: generateUniqueCode(body.char_length),
            voucher_id: updateVoucherCode.id,
          });
        }

        await tx.uvcvoucher.deleteMany({
          where: {
            voucher_id: updateVoucherCode.id,
          },
        });

        if (generateVoucher.length > 30000) {
          const chunkSize = 30000;
          const chunkData = [];
          for (let i = 0; i < generateVoucher.length; i += chunkSize) {
            chunkData.push(generateVoucher.slice(i, i + chunkSize));
          }
          const responseInsertChunk: any[] = [];
          for (const chunk of chunkData) {
            await this.checkingDuplicateGenerateVoucher(chunk);
            const uvcGenerate = await tx.uvcvoucher.createMany({
              data: chunk,
              skipDuplicates: true,
            });
            responseInsertChunk.push(uvcGenerate);
          }

          return responseInsertChunk;
        }

        await this.checkingDuplicateGenerateVoucher(generateVoucher);

        const uvcGenerate = await tx.uvcvoucher.createMany({
          data: generateVoucher,
          skipDuplicates: true,
        });

        return uvcGenerate;
      },
      {
        timeout: 60000,
      },
    );

    return data;
  }

  private async checkingDuplicateGenerateVoucher(
    array: ArrayGenerateVoucher[],
  ) {
    const checkIfDuplicateDb = await this.prisma.uvcvoucher.count({
      where: {
        code: {
          in: array.map((item) => item.code),
        },
      },
    });
    const mapCode = array.map((itemMap) => itemMap.code);
    const checkDuplicateCode = mapCode.filter(
      (itemFilter, index) => mapCode.indexOf(itemFilter) !== index,
    );

    if (checkIfDuplicateDb > 0 || checkDuplicateCode.length > 0) {
      throw new HttpException(
        'error generate code, duplicate code',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
