import { Module } from '@nestjs/common';
import { SalesDetailController } from './sales-detail.controller';
import { SalesDetailService } from './sales-detail.service';

@Module({
  controllers: [SalesDetailController],
  providers: [SalesDetailService]
})
export class SalesDetailModule {}
