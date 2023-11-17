import { Module } from '@nestjs/common';
import { ProductCardsService } from './product-cards.service';
import { ProductCardsController } from './product-cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCards } from './entities/product-cards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCards])],
  providers: [ProductCardsService],
  controllers: [ProductCardsController],
  exports: [ProductCardsService],
})
export class ProductCardsModule {}
