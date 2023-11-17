import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  // @ApiProperty({ example: '0' })
  // id: number;

  @ApiProperty({ example: 'Category Name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string | null;
}
