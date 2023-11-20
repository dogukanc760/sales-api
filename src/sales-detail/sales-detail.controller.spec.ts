import { Test, TestingModule } from '@nestjs/testing';
import { SalesDetailController } from './sales-detail.controller';

describe('SalesDetailController', () => {
  let controller: SalesDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesDetailController],
    }).compile();

    controller = module.get<SalesDetailController>(SalesDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
