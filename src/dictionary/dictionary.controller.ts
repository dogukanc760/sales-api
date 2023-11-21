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
import { DictionaryService } from './dictionary.service';
import { QueryDictionaryDto } from './dtos/query-dictionary.dto';
import { Dictionaries } from './entities/dictionaries.entity';
import { CreateDictionaryDto } from './dtos/create-dictionary.dto';
import { UpdateDictionaryDto } from './dtos/update-dictionary.dto';

// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Dictionaries')
@Controller({
  path: 'dictionaries',
  version: '1',
})
export class DictionaryController {
  constructor(private dictionaryService: DictionaryService) {}

  @Get()
  public async getdictionarys(
    @Query() query: QueryDictionaryDto,
  ): Promise<any> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const dictionarys = await this.dictionaryService.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: {
        page,
        limit,
      },
    });
    return {
      totalCount: dictionarys[1],
      dictionaries: dictionarys[0],
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Dictionaries>> {
    return this.dictionaryService.findOne({ id: +id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createdictionaryDto: CreateDictionaryDto,
  ): Promise<Dictionaries> {
    return this.dictionaryService.create(createdictionaryDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updatedictionaryDto: UpdateDictionaryDto,
  ): Promise<Dictionaries> {
    return this.dictionaryService.update(id, updatedictionaryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.dictionaryService.softDelete(id);
  }
}
