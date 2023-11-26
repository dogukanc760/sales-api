import { Injectable } from '@nestjs/common';
import { DeepPartial, Equal, FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Sales } from './entities/sales.entity';
import { CreateSalesDto } from './dto/create-sales.dto';
import { FilterSalesDto, SortSalesDto } from './dto/query-sales.dto';
import { SalesDetailService } from 'src/sales-detail/sales-detail.service';
import { CreateSalesDetailedDto } from './dto/create-sales-detailed.dto';
import {
  FilterSalesDetailDto,
  SortSalesDetailViewDto,
} from 'src/sales-detail/dto/query-sales-detail.dto';
import { salesDetailViewQuery } from 'src/utils/queries/sales-queries';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sales)
    private SalesRepository: Repository<Sales>,
    private salesDetailService: SalesDetailService,
  ) {}

  create(createSalesDto: CreateSalesDto): Promise<Sales> {
    return this.SalesRepository.save(
      this.SalesRepository.create(createSalesDto),
    );
  }

  async createWithDetail(
    createSalesDetailDto: CreateSalesDetailedDto,
  ): Promise<Sales> {
    const createdSales = await this.SalesRepository.save(
      this.SalesRepository.create(createSalesDetailDto.sales),
    );
    createSalesDetailDto.salesDetail.forEach(async (salesDetail) => {
      salesDetail.salesId = createdSales.id.toString();

      await this.salesDetailService.create(salesDetail);
    });
    return createdSales;
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

  async findManyWithViewPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterSalesDetailDto | null;
    sortOptions?: SortSalesDetailViewDto[] | null;
    paginationOptions: IPaginationOptions;
  }) {
    const whereConditions: string[] = ['"deletedAt" is null'];

    if (filterOptions) {
      const { productId, salesId } = filterOptions;

      productId && whereConditions.push(`product_id = '${productId}'`);
      salesId && whereConditions.push(`sales_id = '${salesId}'`);
    }

    const orderClause = sortOptions
      ? `order by ${sortOptions[0].orderBy} ${sortOptions[0].order}`
      : `order by "sales_created_at" desc`;

    const baseQuery = `${salesDetailViewQuery()} where ${whereConditions.join(
      ' and ',
    )} ${orderClause}
    offset ${(paginationOptions.page - 1) * paginationOptions.limit} limit ${
      paginationOptions.limit
    }`;

    const totalCountQuery = baseQuery
      .replace(orderClause, '')
      .replace('*', 'Count(*)');

    const salesDetail = await this.SalesRepository.query(baseQuery);
    const totalCount = await this.SalesRepository.query(totalCountQuery);
    return {
      salesDetail,
      totalCount: Number(totalCount[0].count),
    };
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
