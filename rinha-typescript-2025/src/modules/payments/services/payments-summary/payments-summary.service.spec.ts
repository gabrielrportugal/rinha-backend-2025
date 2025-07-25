import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsSummaryService } from './payments-summary.service';

describe('PaymentsSummaryService', () => {
  let service: PaymentsSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsSummaryService],
    }).compile();

    service = module.get<PaymentsSummaryService>(PaymentsSummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
