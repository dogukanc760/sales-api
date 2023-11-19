import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  Equal,
  FindManyOptions,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { CurrentAccounts } from './entities/current-accounts.entity';
import { CreateCurrentAccountDto } from './dto/create-currenct-account.dto';
import {
  FilterCurrentAccountsDto,
  SortCurrentAccountsDto,
} from './dto/query-current-accounts.dto';

@Injectable()
export class CurrentAccountsService {
  constructor(
    @InjectRepository(CurrentAccounts)
    private CurrentAccountsRepository: Repository<CurrentAccounts>,
  ) {}

  create(
    createCurrentAccountsDto: CreateCurrentAccountDto,
  ): Promise<CurrentAccounts> {
    return this.CurrentAccountsRepository.save(
      this.CurrentAccountsRepository.create(createCurrentAccountsDto),
    );
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCurrentAccountsDto | null;
    sortOptions?: SortCurrentAccountsDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<[CurrentAccounts[], number]> {
    const findOption: FindManyOptions<CurrentAccounts> = {
      select: [
        'id',
        'name',
        'address',
        'city',
        'distinct',
        'phoneNumber',
        'taxPlace',
        'phoneNumber',
        'taxNumber',
        'email',
        'balance',
        'isBalancePositive',
      ],
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
      where: {},
    };
    findOption.withDeleted = false;

    if (filterOptions?.name) {
      findOption.where!['name'] = ILike(`%${filterOptions.name}%`);
    }

    if (filterOptions?.email) {
      findOption.where!['email'] = ILike(`%${filterOptions.email}%`);
    }

    if (filterOptions?.city) {
      findOption.where!['city'] = ILike(`%${filterOptions.city}%`);
    }

    if (filterOptions?.distinct) {
      findOption.where!['distinct'] = ILike(`%${filterOptions.distinct}%`);
    }

    if (filterOptions?.phoneNumber) {
      findOption.where!['phoneNumber'] = ILike(
        `%${filterOptions.phoneNumber}%`,
      );
    }

    if (filterOptions?.taxPlace) {
      findOption.where!['taxPlace'] = ILike(`%${filterOptions.taxPlace}%`);
    }

    if (filterOptions?.taxNumber) {
      findOption.where!['taxNumber'] = ILike(`%${filterOptions.taxNumber}%`);
    }

    if (filterOptions?.balanceGt) {
      findOption.where!['balance'] = MoreThanOrEqual(
        `${filterOptions.balanceGt}`,
      );
    }

    if (filterOptions?.balanceLt) {
      findOption.where!['balance'] = LessThanOrEqual(
        `${filterOptions.balanceLt}`,
      );
    }

    if (filterOptions?.isBalancePositive) {
      findOption.where!['isBalancePositive'] = Equal(
        `%${filterOptions.isBalancePositive}%`,
      );
    }

    return this.CurrentAccountsRepository.findAndCount(findOption);
  }

  findOne(
    fields: EntityCondition<CurrentAccounts>,
  ): Promise<NullableType<CurrentAccounts>> {
    return this.CurrentAccountsRepository.findOne({
      where: fields,
    });
  }

  update(
    id: CurrentAccounts['id'],
    payload: DeepPartial<CurrentAccounts>,
  ): Promise<CurrentAccounts> {
    return this.CurrentAccountsRepository.save(
      this.CurrentAccountsRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: CurrentAccounts['id']): Promise<void> {
    await this.CurrentAccountsRepository.softDelete(id);
  }
}
