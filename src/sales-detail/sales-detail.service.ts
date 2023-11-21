import { Injectable } from '@nestjs/common';
import { DeepPartial, Equal, FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { CreateSalesDetailDto } from './dto/create-sales-detail.dto';
import {
  FilterSalesDetailDto,
  SortSalesDetailDto,
} from './dto/query-sales-detail.dto';
import { SalesDetail } from './entities/sales-detail.entity';

@Injectable()
export class SalesDetailService {
  constructor(
    @InjectRepository(SalesDetail)
    private SalesDetailRepository: Repository<SalesDetail>,
  ) {}

  create(createSalesDetailDto: CreateSalesDetailDto): Promise<SalesDetail> {
    return this.SalesDetailRepository.save(
      this.SalesDetailRepository.create(createSalesDetailDto),
    );
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterSalesDetailDto | null;
    sortOptions?: SortSalesDetailDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<[SalesDetail[], number]> {
    const findOption: FindManyOptions<SalesDetail> = {
      select: ['id', 'salesId', 'productId'],
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

    if (filterOptions?.salesId) {
      findOption.where!['salesId'] = Equal(`${filterOptions.salesId}`);
    }

    if (filterOptions?.productId) {
      findOption.where!['productId'] = Equal(`${filterOptions.productId}`);
    }

    return this.SalesDetailRepository.findAndCount(findOption);
  }

  findOne(
    fields: EntityCondition<SalesDetail>,
  ): Promise<NullableType<SalesDetail>> {
    return this.SalesDetailRepository.findOne({
      where: fields,
    });
  }

  update(
    id: SalesDetail['id'],
    payload: DeepPartial<SalesDetail>,
  ): Promise<SalesDetail> {
    return this.SalesDetailRepository.save(
      this.SalesDetailRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: SalesDetail['id']): Promise<void> {
    await this.SalesDetailRepository.softDelete(id);
  }
}
