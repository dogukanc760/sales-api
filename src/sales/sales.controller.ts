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
import { CreateSalesDto } from './dto/create-sales.dto';
import { QuerySalesDto } from './dto/query-sales.dto';
import { UpdateSalesDto } from './dto/update-sales.dto';
import { Sales } from './entities/sales.entity';
import { SalesService } from './sales.service';

// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Sales')
@Controller({
  path: 'sales',
  version: '1',
})
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get()
  public async getSaless(@Query() query: QuerySalesDto): Promise<any> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const Saless = await this.salesService.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: {
        page,
        limit,
      },
    });
    return {
      totalCount: Saless[1],
      Sales: Saless[0],
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Sales>> {
    return this.salesService.findOne({ id: +id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSalesDto: CreateSalesDto): Promise<Sales> {
    return this.salesService.create(createSalesDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateSalesDto: UpdateSalesDto,
  ): Promise<Sales> {
    return this.salesService.update(id, updateSalesDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.salesService.softDelete(id);
  }
}
