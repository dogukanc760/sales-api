import { Injectable } from '@nestjs/common';
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
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { ProductCards } from './entities/product-cards.entity';
import { CreateProductCardDto } from './dto/create-product-card.dto';
import {
  FilterProductCardDto,
  SortProductCardDto,
} from './dto/query-product-card.dto';

@Injectable()
export class ProductCardsService {
  constructor(
    @InjectRepository(ProductCards)
    private ProductCardsRepository: Repository<ProductCards>,
  ) {}

  create(createProductCardsDto: CreateProductCardDto): Promise<ProductCards> {
    return this.ProductCardsRepository.save(
      this.ProductCardsRepository.create(createProductCardsDto),
    );
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterProductCardDto | null;
    sortOptions?: SortProductCardDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<[ProductCards[], number]> {
    const findOption: FindManyOptions<ProductCards> = {
      select: ['id', 'name', 'imgUrl', 'categoryId'],
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

    if (filterOptions?.categoryId) {
      findOption.where!['categoryId'] = Equal(`${filterOptions.categoryId}`);
    }

    return this.ProductCardsRepository.findAndCount(findOption);
  }

  findOne(
    fields: EntityCondition<ProductCards>,
  ): Promise<NullableType<ProductCards>> {
    return this.ProductCardsRepository.findOne({
      where: fields,
    });
  }

  update(
    id: ProductCards['id'],
    payload: DeepPartial<ProductCards>,
  ): Promise<ProductCards> {
    return this.ProductCardsRepository.save(
      this.ProductCardsRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: ProductCards['id']): Promise<void> {
    await this.ProductCardsRepository.softDelete(id);
  }
}
