import { Injectable } from '@nestjs/common';
import { Products } from './entities/product.entity';
import {
  DeepPartial,
  Equal,
  FindManyOptions,
  ILike,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import {
  FilterProductDto,
  SortProductDto,
  SortProductViewDto,
} from './dto/query-product.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { CreateProductDto } from './dto/create-product.dto';
import { productListViewQuery } from 'src/utils/queries/product-queries';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Products> {
    return this.productRepository.save(
      this.productRepository.create(createProductDto),
    );
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterProductDto | null;
    sortOptions?: SortProductDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<[Products[], number]> {
    const findOption: FindManyOptions<Products> = {
      select: [
        'id',
        'productCardId',
        'categoryId',
        'imgUrl',
        'barcode',
        'productName',
        'brand',
        'count',
        'buyPrice',
        'quantityPrice',
        'sellPrice',
        'taxRate',
        'ratedPrice',
        'unitType',
        'unitBuyType',
        'showOnSellScreen',
        'createdAt',
        'updatedAt',
        'deletedAt',
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
      // join: {
      //   alias: 'attendance',
      //   leftJoinAndSelect: {
      //     user: 'attendance.user',
      //     outlet: 'attendance.outlet',
      //   },
      // },
    };
    findOption.withDeleted = false;
    if (filterOptions?.barcode) {
      findOption.where!['barcode'] = Equal(`${filterOptions.barcode}`);
    }

    if (filterOptions?.productCardId) {
      findOption.where!['productCardId'] = Equal(
        `${filterOptions.productCardId}`,
      );
    }

    if (filterOptions?.categoryId) {
      findOption.where!['categoryId'] = Equal(`${filterOptions.categoryId}`);
    }

    if (filterOptions?.productName) {
      findOption.where!['productName'] = ILike(
        `%${filterOptions.productName}%`,
      );
    }

    if (filterOptions?.brand) {
      findOption.where!['brand'] = Equal(`${filterOptions.brand}`);
    }

    if (filterOptions?.unitType) {
      findOption.where!['unitType'] = Equal(`${filterOptions.unitType}`);
    }

    if (filterOptions?.showOnSellScreen) {
      findOption.where!['showOnSellScreen'] = Equal(
        `${filterOptions.showOnSellScreen}`,
      );
    }

    return this.productRepository.findAndCount(findOption);
  }

  async findManyWithPaginationView({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterProductDto | null;
    sortOptions?: SortProductViewDto[] | null;
    paginationOptions: IPaginationOptions;
  }) {
    let totalCountQuery: string = '';
    let baseQuery = productListViewQuery() + ` where "deletedAt" is null`;
    if (filterOptions?.barcode) {
      baseQuery += ` and barcode = '${filterOptions.barcode}'`;
    }

    if (filterOptions?.productCardId) {
      baseQuery += ` and product_card_id='${filterOptions.productCardId}'`;
    }

    if (filterOptions?.categoryId) {
      baseQuery += ` and category_id='${filterOptions.categoryId}'`;
    }

    if (filterOptions?.productName) {
      baseQuery += ` and "productName" ilike '%${filterOptions.productName}%'`;
    }

    if (filterOptions?.brand) {
      baseQuery += ` and brand_id='${filterOptions.brand}'`;
    }

    if (filterOptions?.unitType) {
      baseQuery += ` and "unitType"='${filterOptions.unitType}'`;
    }

    if (filterOptions?.showOnSellScreen) {
      baseQuery += ` and "showOnSellScreen"=${filterOptions.showOnSellScreen}`;
    }
    if (typeof sortOptions === 'undefined') {
      baseQuery += ` 
    order by "createdAt" desc 
    offset ${(paginationOptions.page - 1) * paginationOptions.limit} limit ${
      paginationOptions.limit
    } `;

      totalCountQuery = baseQuery.replace(
        `  order by "createdAt" desc 
    offset ${(paginationOptions.page - 1) * paginationOptions.limit} limit ${
      paginationOptions.limit
    } `,
        '',
      );
      totalCountQuery = totalCountQuery.replace('*', 'Count(*)');
    } else {
      baseQuery += ` 
    order by ${sortOptions![0].orderBy} ${sortOptions![0].order} 
    offset ${(paginationOptions.page - 1) * paginationOptions.limit} limit ${
      paginationOptions.limit
    } `;
      totalCountQuery = baseQuery.replace(
        ` order by  ${sortOptions![0].orderBy} ${sortOptions![0].order} 
    offset ${(paginationOptions.page - 1) * paginationOptions.limit} limit ${
      paginationOptions.limit
    } `,
        '',
      );
      totalCountQuery = totalCountQuery.replace('*', 'Count(*)');
    }
    console.log('dodo', baseQuery);
    const products = await this.productRepository.query(baseQuery);

    const totalCount = await this.productRepository.query(totalCountQuery);

    return {
      products,
      totalCount: Number(totalCount[0].count),
    };
  }

  findOne(fields: EntityCondition<Products>): Promise<NullableType<Products>> {
    return this.productRepository.findOne({
      where: fields,
    });
  }

  update(
    id: Products['id'],
    payload: DeepPartial<Products>,
  ): Promise<Products> {
    return this.productRepository.save(
      this.productRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: Products['id']): Promise<void> {
    await this.productRepository.softDelete(id);
  }
}
