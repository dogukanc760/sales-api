import { Module } from '@nestjs/common';
import { DynamicReportsService } from './dynamic-reports.service';
import { DynamicReportsController } from './dynamic-reports.controller';

@Module({
  providers: [DynamicReportsService],
  controllers: [DynamicReportsController]
})
export class DynamicReportsModule {}
