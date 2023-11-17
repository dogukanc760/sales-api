import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ example: 'Brand Name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string | null;

  @ApiProperty({ example: 'Image Url' })
  @IsString()
  @MinLength(3)
  imgUrl: string | null;
}
