import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GenerateVoucherDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'example voucher name',
    required: true,
  })
  voucher_name: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 14,
    required: true,
  })
  amount: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 14,
    required: true,
  })
  num_generations: number;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2024-01-01',
    required: true,
  })
  start_date: Date;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2024-01-01',
    required: true,
  })
  end_date: Date;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 5,
    required: true,
  })
  char_length: number;
}

export class UpdateVoucher {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'example voucher name',
    required: true,
  })
  voucher_name: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 14,
    required: true,
  })
  amount: number;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2024-01-01',
    required: true,
  })
  start_date: Date;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2024-01-01',
    required: true,
  })
  end_date: Date;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 5,
    required: true,
  })
  char_length: number;
}

export interface ArrayGenerateVoucher {
  code: string;
  voucher_id?: string;
}
