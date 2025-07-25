import { Test, TestingModule } from '@nestjs/testing';
import { PaymentHealthCheckCronService } from './payment-health-check-cron.service';

describe('PaymentHealthCheckCronService', () => {
  let service: PaymentHealthCheckCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentHealthCheckCronService],
    }).compile();

    service = module.get<PaymentHealthCheckCronService>(PaymentHealthCheckCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
