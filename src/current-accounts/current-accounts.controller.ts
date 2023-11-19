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
import { CurrentAccountsService } from './current-accounts.service';
import { QueryCurrentAccountsDto } from './dto/query-current-accounts.dto';
import { UpdateCurrentAccountsDto } from './dto/update-current-accounts.dto';
import { CurrentAccounts } from './entities/current-accounts.entity';
import { CreateCurrentAccountDto } from './dto/create-currenct-account.dto';

// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('CurrentAccounts')
@Controller({
  path: 'current-accounts',
  version: '1',
})
export class CurrentAccountsController {
  constructor(private CurrentAccountsservice: CurrentAccountsService) {}

  @Get()
  public async getCurrentAccountss(
    @Query() query: QueryCurrentAccountsDto,
  ): Promise<any> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const CurrentAccountss =
      await this.CurrentAccountsservice.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      });
    return {
      totalCount: CurrentAccountss[1],
      currentAccounts: CurrentAccountss[0],
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<CurrentAccounts>> {
    return this.CurrentAccountsservice.findOne({ id: +id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createCurrentAccountssDto: CreateCurrentAccountDto,
  ): Promise<CurrentAccounts> {
    return this.CurrentAccountsservice.create(createCurrentAccountssDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateCurrentAccountssDto: UpdateCurrentAccountsDto,
  ): Promise<CurrentAccounts> {
    return this.CurrentAccountsservice.update(id, updateCurrentAccountssDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.CurrentAccountsservice.softDelete(id);
  }
}
