import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { SalesDetail } from '../entities/sales-detail.entity';

export class FilterSalesDetailDto {
  @IsOptional()
  @ApiProperty({ type: String })
  salesId: string | null;

  @IsOptional()
  @ApiProperty({ type: String })
  productId: string | null;
}

export class SortSalesDetailDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof SalesDetail;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QuerySalesDetailDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value
      ? plainToInstance(FilterSalesDetailDto, JSON.parse(value))
      : undefined,
  )
  @ValidateNested()
  @Type(() => FilterSalesDetailDto)
  filters?: FilterSalesDetailDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value
      ? plainToInstance(SortSalesDetailDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortSalesDetailDto)
  sort?: SortSalesDetailDto[] | null;
}
