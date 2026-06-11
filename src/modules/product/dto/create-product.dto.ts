import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from '../interfaces/product.interface';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PRODUCT_STATUS_ENUM } from 'src/common/constants/status.constants';

export class CreateProductDto implements Partial<IProduct> {
  @ApiProperty({
    example: 'Crop Hoodie',
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 2200,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: PRODUCT_STATUS_ENUM.AVAILABLE,
    required: true,
    enum: PRODUCT_STATUS_ENUM,
  })
  @IsNotEmpty()
  @IsEnum(PRODUCT_STATUS_ENUM)
  status: PRODUCT_STATUS_ENUM;

  @ApiProperty({
    example: 'crop hoodie made up of high quality 320 gsm fabric',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
