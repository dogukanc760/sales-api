import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Brand } from '../entities/brand.entity';

export class FilterBrandDto {
  @IsOptional()
  @ApiProperty({ type: String })
  name: string | null;
}

export class SortBrandDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Brand;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryBrandDto {
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
    value ? plainToInstance(FilterBrandDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterBrandDto)
  filters?: FilterBrandDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value ? plainToInstance(SortBrandDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortBrandDto)
  sort?: SortBrandDto[] | null;
}
