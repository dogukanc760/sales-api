import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Category } from '../entities/category.entity';

export class FilterCategoryDto {
  @IsOptional()
  @ApiProperty({ type: String })
  name: string | null;
}

export class SortCategoryDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Category;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryCategoryDto {
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
    value ? plainToInstance(FilterCategoryDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterCategoryDto)
  filters?: FilterCategoryDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value
      ? plainToInstance(SortCategoryDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortCategoryDto)
  sort?: SortCategoryDto[] | null;
}
