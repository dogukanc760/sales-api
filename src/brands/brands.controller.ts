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
import { BrandsService } from './brands.service';
import { QueryBrandDto } from './dto/query-Brand.dto';
import { CreateBrandDto } from './dto/create-Brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Brands')
@Controller({
  path: 'brands',
  version: '1',
})
export class BrandsController {
  constructor(private Brandservice: BrandsService) {}

  @Get()
  public async getBrands(@Query() query: QueryBrandDto): Promise<any> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const Brands = await this.Brandservice.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: {
        page,
        limit,
      },
    });
    return {
      totalCount: Brands[1],
      brands: Brands[0],
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Brand>> {
    return this.Brandservice.findOne({ id: +id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBrandsDto: CreateBrandDto): Promise<Brand> {
    return this.Brandservice.create(createBrandsDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateBrandsDto: UpdateBrandDto,
  ): Promise<Brand> {
    return this.Brandservice.update(id, updateBrandsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.Brandservice.softDelete(id);
  }
}
