import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NullableType } from 'src/utils/types/nullable.type';
import { ProductCardsService } from './product-cards.service';
import { CreateProductCardDto } from './dto/create-product-card.dto';
import { QueryProductCardDto } from './dto/query-product-card.dto';
import { UpdateProductCardDto } from './dto/update-brand.dto';
import { ProductCards } from './entities/product-cards.entity';

// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Product Cards')
@Controller({
  path: 'product-cards',
  version: '1',
})
export class ProductCardsController {
  constructor(private ProductCardservice: ProductCardsService) {}

  @Get()
  public async getProductCards(
    @Query() query: QueryProductCardDto,
  ): Promise<any> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const ProductCards = await this.ProductCardservice.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: {
        page,
        limit,
      },
    });
    return {
      totalCount: ProductCards[1],
      productCards: ProductCards[0],
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<ProductCards>> {
    return this.ProductCardservice.findOne({ id: +id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createProductCardsDto: CreateProductCardDto,
  ): Promise<ProductCards> {
    return this.ProductCardservice.create(createProductCardsDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateProductCardsDto: UpdateProductCardDto,
  ): Promise<ProductCards> {
    return this.ProductCardservice.update(id, updateProductCardsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.ProductCardservice.softDelete(id);
  }
}
