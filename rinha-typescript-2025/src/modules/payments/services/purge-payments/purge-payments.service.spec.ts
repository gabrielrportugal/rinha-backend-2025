import { Test, TestingModule } from '@nestjs/testing';
import { PurgePaymentsService } from './purge-payments.service';

describe('PurgePaymentsService', () => {
  let service: PurgePaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurgePaymentsService],
    }).compile();

    service = module.get<PurgePaymentsService>(PurgePaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
