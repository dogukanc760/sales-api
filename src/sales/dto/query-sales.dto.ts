import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Sales } from '../entities/sales.entity';

export class FilterSalesDto {
  @IsOptional()
  @ApiProperty({ type: String })
  id: string | null;

  @IsOptional()
  @ApiProperty({ type: String })
  currentAccountId: string | null;

  @IsOptional()
  @ApiProperty({ type: String })
  paymentMethod: string | null;
}

export class SortSalesDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Sales;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QuerySalesDto {
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
    value ? plainToInstance(FilterSalesDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterSalesDto)
  filters?: FilterSalesDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value ? plainToInstance(SortSalesDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortSalesDto)
  sort?: SortSalesDto[] | null;
}
