import { Test, TestingModule } from '@nestjs/testing';
import { GetPaymentProcessorStatusService } from '@payment-health-check/services';

describe('GetPaymentProcessorStatusService', () => {
  let service: GetPaymentProcessorStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetPaymentProcessorStatusService],
    }).compile();

    service = module.get<GetPaymentProcessorStatusService>(
      GetPaymentProcessorStatusService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
