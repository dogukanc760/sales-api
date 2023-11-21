import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionaries } from './entities/dictionaries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dictionaries])],
  providers: [DictionaryService],
  controllers: [DictionaryController],
  exports: [DictionaryService],
})
export class DictionaryModule {}
