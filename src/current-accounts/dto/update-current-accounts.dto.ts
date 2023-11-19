import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { CreateCurrentAccountDto } from './create-currenct-account.dto';

export class UpdateCurrentAccountsDto extends PartialType(
  CreateCurrentAccountDto,
) {
  @ApiProperty({ example: 'Current Account Name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string | null;

  @ApiProperty({ example: 'Address Line' })
  @IsString()
  @MinLength(3)
  address: string | null;

  @ApiProperty({ example: 'City Name' })
  @IsString()
  city: string | null;

  @ApiProperty({ example: 'Distinct Name' })
  @IsString()
  distinct: string | null;

  @ApiProperty({ example: 'Phone Number' })
  @IsString()
  phoneNumber: string | null;

  @ApiProperty({ example: 'Tax Place' })
  @IsString()
  taxPlace: string | null;

  @ApiProperty({ example: 'Tax Number' })
  @IsString()
  taxNumber: string | null;

  @ApiProperty({ example: 'Email' })
  @IsString()
  email: string | null;

  @ApiProperty({ example: 125.9 })
  @IsNumber()
  balance: number | null;
}
