import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GetPaymentProcessorStatusService } from '@payment-health-check/services';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

const everyFiveSeconds: string = '*/5 * * * * *';
@Injectable()
export class PaymentHealthCheckCronService {
  private readonly logger = new Logger(PaymentHealthCheckCronService.name);
  constructor(
    @Inject('GET_PAYMENT_PROCESSOR_STATUS_SERVICE')
    private readonly getPaymentProcessorStatusService: GetPaymentProcessorStatusService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Cron(everyFiveSeconds)
  async checkHealth() {
    this.logger.debug('Checking payment health');
    const paymentProcessorStatus =
      await this.getPaymentProcessorStatusService.getPaymentProcessorStatus();

    this.logger.debug(JSON.stringify(paymentProcessorStatus));

    await this.cacheManager.set(
      'mainProcessorStatus',
      paymentProcessorStatus.mainProcessorStatus.failing,
    );
    await this.cacheManager.set(
      'fallbackProcessorStatus',
      paymentProcessorStatus.fallbackProcessorStatus.failing,
    );
  }
}
