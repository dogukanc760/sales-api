import { Test, TestingModule } from '@nestjs/testing';
import { DynamicReportsController } from './dynamic-reports.controller';

describe('DynamicReportsController', () => {
  let controller: DynamicReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DynamicReportsController],
    }).compile();

    controller = module.get<DynamicReportsController>(DynamicReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
