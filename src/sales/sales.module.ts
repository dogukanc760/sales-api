import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from './entities/sales.entity';
import { SalesDetailModule } from 'src/sales-detail/sales-detail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sales]), SalesDetailModule],
  providers: [SalesService],
  controllers: [SalesController],
  exports: [SalesService],
})
export class SalesModule {}
