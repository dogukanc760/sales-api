import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateSalesDetailDto } from './create-sales-detail.dto';

export class UpdateSalesDetailDto extends PartialType(CreateSalesDetailDto) {
  @ApiProperty({ example: 'Sales Id Number' })
  @IsNotEmpty()
  @IsString()
  salesId: string | null;

  @ApiProperty({ example: 'Product Id Number' })
  @IsNotEmpty()
  @IsString()
  productId: string | null;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsNumber()
  count: number | null;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsNumber()
  unitPrice: number | null;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsNumber()
  taxRate: number | null;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsNumber()
  totalUnitPrice: number | null;

  @ApiProperty({ example: 'Unit Type' })
  @IsString()
  unitType: string | null;

  @ApiProperty({ example: 'Description' })
  @IsString()
  description: string | null;
}
