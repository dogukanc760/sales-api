import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateBrandDto } from './create-brand.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  // @ApiProperty({ example: '0' })
  // id: number;

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
