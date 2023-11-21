import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Dictionaries } from '../entities/dictionaries.entity';

export class FilterDictionaryDto {
  @IsOptional()
  @ApiProperty({ type: String })
  unitCode: string | null;

  @IsOptional()
  @ApiProperty({ type: String })
  key: string | null;
}

export class SortDictionaryDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Dictionaries;

  @ApiProperty()
  @IsString()
  order: string;
}

export class SortDictionaryViewDto {
  @ApiProperty()
  @IsString()
  orderBy: string | 'createdAt';

  @ApiProperty()
  @IsString()
  order: string | 'desc';
}

export class QueryDictionaryDto {
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
    value ? plainToInstance(FilterDictionaryDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterDictionaryDto)
  filters?: FilterDictionaryDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value
      ? plainToInstance(SortDictionaryDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortDictionaryDto)
  sort?: SortDictionaryDto[] | null;
}
