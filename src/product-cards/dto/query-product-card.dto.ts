import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { ProductCards } from '../entities/product-cards.entity';

export class FilterProductCardDto {
  @IsOptional()
  @ApiProperty({ type: String })
  name: string | null;

  @IsOptional()
  @ApiProperty({ type: String })
  categoryId: string | null;
}

export class SortProductCardDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof ProductCards;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryProductCardDto {
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
      ? plainToInstance(FilterProductCardDto, JSON.parse(value))
      : undefined,
  )
  @ValidateNested()
  @Type(() => FilterProductCardDto)
  filters?: FilterProductCardDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value
      ? plainToInstance(SortProductCardDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortProductCardDto)
  sort?: SortProductCardDto[] | null;
}
