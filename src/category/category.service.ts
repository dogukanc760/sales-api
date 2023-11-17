import { Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategoryDto, SortCategoryDto } from './dto/query-category.dto';
import { Category } from './entities/Category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.CategoryRepository.save(
      this.CategoryRepository.create(createCategoryDto),
    );
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCategoryDto | null;
    sortOptions?: SortCategoryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<[Category[], number]> {
    const findOption: FindManyOptions<Category> = {
      select: ['id', 'name'],
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

    return this.CategoryRepository.findAndCount(findOption);
  }

  findOne(fields: EntityCondition<Category>): Promise<NullableType<Category>> {
    return this.CategoryRepository.findOne({
      where: fields,
    });
  }

  update(
    id: Category['id'],
    payload: DeepPartial<Category>,
  ): Promise<Category> {
    return this.CategoryRepository.save(
      this.CategoryRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: Category['id']): Promise<void> {
    await this.CategoryRepository.softDelete(id);
  }
}
