import { Injectable } from '@nestjs/common';
import { DeepPartial, Equal, FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Sales } from './entities/sales.entity';
import { CreateSalesDto } from './dto/create-sales.dto';
import { FilterSalesDto, SortSalesDto } from './dto/query-sales.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sales)
    private SalesRepository: Repository<Sales>,
  ) {}

  create(createSalesDto: CreateSalesDto): Promise<Sales> {
    return this.SalesRepository.save(
      this.SalesRepository.create(createSalesDto),
    );
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterSalesDto | null;
    sortOptions?: SortSalesDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<[Sales[], number]> {
    const findOption: FindManyOptions<Sales> = {
      select: ['id', 'currentAccountId', 'paymentMethod'],
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

    if (filterOptions?.id) {
      findOption.where!['id'] = Equal(`${filterOptions.id}`);
    }

    if (filterOptions?.currentAccountId) {
      findOption.where!['currentAccountId'] = Equal(
        `${filterOptions.currentAccountId}`,
      );
    }

    if (filterOptions?.paymentMethod) {
      findOption.where!['paymentMethod'] = Equal(
        `${filterOptions.paymentMethod}`,
      );
    }

    return this.SalesRepository.findAndCount(findOption);
  }

  findOne(fields: EntityCondition<Sales>): Promise<NullableType<Sales>> {
    return this.SalesRepository.findOne({
      where: fields,
    });
  }

  update(id: Sales['id'], payload: DeepPartial<Sales>): Promise<Sales> {
    return this.SalesRepository.save(
      this.SalesRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: Sales['id']): Promise<void> {
    await this.SalesRepository.softDelete(id);
  }
}
