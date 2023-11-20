import { Test, TestingModule } from '@nestjs/testing';
import { DynamicReportsService } from './dynamic-reports.service';

describe('DynamicReportsService', () => {
  let service: DynamicReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicReportsService],
    }).compile();

    service = module.get<DynamicReportsService>(DynamicReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
