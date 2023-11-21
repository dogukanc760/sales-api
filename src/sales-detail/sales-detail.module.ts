import { Module } from '@nestjs/common';
import { SalesDetailController } from './sales-detail.controller';
import { SalesDetailService } from './sales-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesDetail } from './entities/sales-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalesDetail])],
  controllers: [SalesDetailController],
  providers: [SalesDetailService],
  exports: [SalesDetailService],
})
export class SalesDetailModule {}
