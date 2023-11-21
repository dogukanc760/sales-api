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
import { CreateSalesDetailDto } from './dto/create-sales-detail.dto';
import { QuerySalesDetailDto } from './dto/query-sales-detail.dto';
import { UpdateSalesDetailDto } from './dto/update-sales-detail.dto';
import { SalesDetail } from './entities/sales-detail.entity';
import { SalesDetailService } from './sales-detail.service';

// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('SalesDetail')
@Controller({
  path: 'sales-detail',
  version: '1',
})
export class SalesDetailController {
  constructor(private salesDetailService: SalesDetailService) {}

  @Get()
  public async getSalesDetails(
    @Query() query: QuerySalesDetailDto,
  ): Promise<any> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const SalesDetails = await this.salesDetailService.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: {
        page,
        limit,
      },
    });
    return {
      totalCount: SalesDetails[1],
      SalesDetail: SalesDetails[0],
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<SalesDetail>> {
    return this.salesDetailService.findOne({ id: +id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createSalesDetailDto: CreateSalesDetailDto,
  ): Promise<SalesDetail> {
    return this.salesDetailService.create(createSalesDetailDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateSalesDetailDto: UpdateSalesDetailDto,
  ): Promise<SalesDetail> {
    return this.salesDetailService.update(id, updateSalesDetailDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.salesDetailService.softDelete(id);
  }
}
