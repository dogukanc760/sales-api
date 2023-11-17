import { Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { CreateBrandDto } from './dto/create-brand.dto';
import { FilterBrandDto, SortBrandDto } from './dto/query-Brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private BrandRepository: Repository<Brand>,
  ) {}

  create(createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.BrandRepository.save(
      this.BrandRepository.create(createBrandDto),
    );
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterBrandDto | null;
    sortOptions?: SortBrandDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<[Brand[], number]> {
    const findOption: FindManyOptions<Brand> = {
      select: ['id', 'name', 'imgUrl'],
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

    return this.BrandRepository.findAndCount(findOption);
  }

  findOne(fields: EntityCondition<Brand>): Promise<NullableType<Brand>> {
    return this.BrandRepository.findOne({
      where: fields,
    });
  }

  update(id: Brand['id'], payload: DeepPartial<Brand>): Promise<Brand> {
    return this.BrandRepository.save(
      this.BrandRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: Brand['id']): Promise<void> {
    await this.BrandRepository.softDelete(id);
  }
}
