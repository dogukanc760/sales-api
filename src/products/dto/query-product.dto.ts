import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Products } from '../entities/product.entity';

export class FilterProductDto {
  @IsOptional()
  @ApiProperty({ type: String })
  productCardId: string | null;

  @IsOptional()
  @ApiProperty({ type: String })
  categoryId: string | null;

  @IsOptional()
  @ApiProperty({ type: String })
  barcode: string | null;

  // containt like query
  @IsOptional()
  @ApiProperty({ type: String })
  productName: string | null;

  // contains like query
  @IsOptional()
  @ApiProperty({ type: String })
  brand: string | null;

  @IsOptional()
  @ApiProperty({ type: String })
  unitType: string | null;

  @IsOptional()
  @ApiProperty({ type: Boolean })
  showOnSellScreen: boolean | null;
}

export class SortProductDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Products;

  @ApiProperty()
  @IsString()
  order: string;
}

export class SortProductViewDto {
  @ApiProperty()
  @IsString()
  orderBy: string | 'createdAt';

  @ApiProperty()
  @IsString()
  order: string | 'desc';
}

export class QueryProductDto {
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
    value ? plainToInstance(FilterProductDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterProductDto)
  filters?: FilterProductDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value
      ? plainToInstance(SortProductDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortProductDto)
  sort?: SortProductDto[] | null;
}

export class QueryProductViewDto {
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
    value ? plainToInstance(FilterProductDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterProductDto)
  filters?: FilterProductDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value
      ? plainToInstance(SortProductViewDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortProductViewDto)
  sort?: SortProductViewDto[] | null;
}
