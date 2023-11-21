import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateSalesDto } from './create-sales.dto';

export class UpdateSalesDto extends PartialType(CreateSalesDto) {
  @ApiProperty({ example: 'Id Number' })
  @IsNotEmpty()
  @IsString()
  currentAccountId: string | null;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsNumber()
  count: number | null;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number | null;

  @ApiProperty({ example: 'credit-card' })
  @IsString()
  paymentMethod: string | null;

  @ApiProperty({ example: 'credit-card' })
  @IsString()
  description: string | null;
}
