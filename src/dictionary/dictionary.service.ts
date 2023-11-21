import { Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Dictionaries } from './entities/dictionaries.entity';
import { CreateDictionaryDto } from './dtos/create-dictionary.dto';
import {
  FilterDictionaryDto,
  SortDictionaryDto,
} from './dtos/query-dictionary.dto';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(Dictionaries)
    private dictionaryRepository: Repository<Dictionaries>,
  ) {}

  create(createdictionaryDto: CreateDictionaryDto): Promise<Dictionaries> {
    return this.dictionaryRepository.save(
      this.dictionaryRepository.create(createdictionaryDto),
    );
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterDictionaryDto | null;
    sortOptions?: SortDictionaryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<[Dictionaries[], number]> {
    const findOption: FindManyOptions<Dictionaries> = {
      select: [
        'id',
        'unitCode',
        'key',
        'value',
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
    };
    findOption.withDeleted = false;

    if (filterOptions?.unitCode) {
      findOption.where!['unitCode'] = ILike(`%${filterOptions.unitCode}%`);
    }

    if (filterOptions?.key) {
      findOption.where!['key'] = ILike(`%${filterOptions.key}%`);
    }

    return this.dictionaryRepository.findAndCount(findOption);
  }

  findOne(
    fields: EntityCondition<Dictionaries>,
  ): Promise<NullableType<Dictionaries>> {
    return this.dictionaryRepository.findOne({
      where: fields,
    });
  }

  update(
    id: Dictionaries['id'],
    payload: DeepPartial<Dictionaries>,
  ): Promise<Dictionaries> {
    return this.dictionaryRepository.save(
      this.dictionaryRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: Dictionaries['id']): Promise<void> {
    await this.dictionaryRepository.softDelete(id);
  }
}
