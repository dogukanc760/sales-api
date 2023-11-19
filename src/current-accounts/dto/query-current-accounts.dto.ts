import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { CurrentAccounts } from '../entities/current-accounts.entity';

export class FilterCurrentAccountsDto {
  @IsOptional()
  @ApiProperty({ type: String })
  name: string | null;

  @IsOptional()
  @ApiProperty({ type: String })
  city: string | null;

  @IsOptional()
  @ApiProperty({ type: String })
  distinct: string | null;

  @IsOptional()
  @ApiProperty({ type: String })
  phoneNumber: string | null;

  @IsOptional()
  @ApiProperty({ type: String })
  taxPlace: string | null;

  @IsOptional()
  @ApiProperty({ type: String })
  taxNumber: string | null;

  @IsOptional()
  @ApiProperty({ type: String })
  email: string | null;

  @IsOptional()
  @ApiProperty({ type: Number })
  balance: number | null;

  // balance greater than or equal to this value
  @IsOptional()
  @ApiProperty({ type: Number })
  balanceGt: number | null;

  // balance less than or equal to this value
  @IsOptional()
  @ApiProperty({ type: Number })
  balanceLt: number | null;

  @IsOptional()
  @ApiProperty({ type: Boolean })
  isBalancePositive: boolean | null;
}

export class SortCurrentAccountsDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof CurrentAccounts;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryCurrentAccountsDto {
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
      ? plainToInstance(FilterCurrentAccountsDto, JSON.parse(value))
      : undefined,
  )
  @ValidateNested()
  @Type(() => FilterCurrentAccountsDto)
  filters?: FilterCurrentAccountsDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value
      ? plainToInstance(SortCurrentAccountsDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortCurrentAccountsDto)
  sort?: SortCurrentAccountsDto[] | null;
}
