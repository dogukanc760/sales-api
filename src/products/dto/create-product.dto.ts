import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Guid' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  productCardId: string | null;

  @ApiProperty({ example: 'Guid' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  categoryId: string | null;

  @ApiProperty({ example: 'https://imgUrl.com' })
  @IsString()
  @MinLength(5)
  imgUrl: string | null;

  @ApiProperty({ example: '898182391238' })
  @IsString()
  @MinLength(5)
  barcode: string | null;

  @ApiProperty({ example: 'Product Name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  productName: string | null;

  @ApiProperty({ example: 'Brand Name' })
  @IsString()
  @MinLength(5)
  brand: string | null;

  @ApiProperty({ example: '10' })
  @IsNotEmpty()
  @IsNumber()
  count: number | null;

  // alış fiyatı
  @ApiProperty({ example: '10' })
  @IsNumber()
  buyPrice: number | null;

  // birim fiyatı
  @ApiProperty({ example: '10' })
  @IsNumber()
  @IsNotEmpty()
  quantityPrice: number | null;

  // Satış fiyatı
  @ApiProperty({ example: '10' })
  @IsNotEmpty()
  @IsNumber()
  sellPrice: number | null;

  // kdv vergi oranı
  @ApiProperty({ example: '20' })
  @IsNotEmpty()
  @IsNumber()
  taxRate: number | null;

  // kdv li fiyatı
  @ApiProperty({ example: '20' })
  @IsNotEmpty()
  @IsNumber()
  ratedPrice: number | null;

  // Agırlık birimi kilo litre koli adet vs vs ....
  @ApiProperty({ example: 'Guid' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  unitType: string | null;

  // Alış Agırlık birimi kilo litre koli adet vs vs ....
  @ApiProperty({ example: 'Guid' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  unitBuyType: string | null;

  // Stoğu satış ekranında göster?
  @ApiProperty({ example: 'Guid' })
  @IsBoolean()
  showOnSellScreen: boolean | null;
}
