import { ApiProperty } from '@nestjs/swagger';
import { CreateSalesDto } from './create-sales.dto';
import { CreateSalesDetailDto } from 'src/sales-detail/dto/create-sales-detail.dto';

export class CreateSalesDetailedDto {
  @ApiProperty({ example: CreateSalesDto, name: 'sales' })
  sales: CreateSalesDto;

  @ApiProperty({
    name: 'salesDetail',
    isArray: true,
    type: CreateSalesDetailDto,
  })
  salesDetail: CreateSalesDetailDto[];
}
