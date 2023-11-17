import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateProductCardDto } from './create-product-card.dto';

export class UpdateProductCardDto extends PartialType(CreateProductCardDto) {
  @ApiProperty({ example: 'Product Card Name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string | null;

  @ApiProperty({ example: 'Image Url' })
  @IsString()
  @MinLength(3)
  imgUrl: string | null;

  @ApiProperty({ example: 'Category Card ID' })
  @IsString()
  @IsNotEmpty()
  categoryId: string | null;
}
