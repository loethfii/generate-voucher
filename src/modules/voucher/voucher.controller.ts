import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  GenerateVoucherDto,
  UpdateVoucher,
} from 'src/dto/generate-voucher.dto';

@ApiTags('Voucher')
@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post('generate')
  @ApiOperation({
    summary: 'Generate Voucher',
    description: 'Generate Voucher.',
  })
  async generateVoucher(@Body() body: GenerateVoucherDto) {
    try {
      return {
        data: await this.voucherService.generateVoucher(body),
        _meta: {
          message: 'Generate voucher success',
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch('update/:voucher_id')
  @ApiOperation({
    summary: 'Update Voucher',
    description: 'Update Voucher.',
  })
  async updateVoucher(
    @Param('voucher_id') voucher_id: string,
    @Body() body: UpdateVoucher,
  ) {
    try {
      return {
        data: await this.voucherService.updateVoucherCode(voucher_id, body),
        _meta: {
          message: 'Update voucher success',
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
