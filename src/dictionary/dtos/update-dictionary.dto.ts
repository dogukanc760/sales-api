import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateDictionaryDto } from './create-dictionary.dto';

export class UpdateDictionaryDto extends PartialType(CreateDictionaryDto) {
  @ApiProperty({ example: 'Unit Code' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(3)
  unitCode: string | null;

  @ApiProperty({ example: 'Key String Value' })
  @IsNotEmpty()
  @IsString()
  key: string | null;

  @ApiProperty({ example: 'Key String Value' })
  @IsNotEmpty()
  @IsString()
  value: string | null;
}
