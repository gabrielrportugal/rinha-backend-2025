import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsSummaryController } from './payments-summary.controller';

describe('PaymentsSummaryController', () => {
  let controller: PaymentsSummaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsSummaryController],
    }).compile();

    controller = module.get<PaymentsSummaryController>(PaymentsSummaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
