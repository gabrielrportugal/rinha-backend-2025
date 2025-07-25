import { Inject, Injectable } from '@nestjs/common';
import { IHealthCheckPaymentProcessor } from '@payment-health-check/protocols';
import { PaymentProcessorStatusResponse } from '@payment-health-check/dtos';

@Injectable()
export class GetPaymentProcessorStatusService {
  constructor(
    @Inject('PAYMENT_PROCESSOR_HEALTH_CHECK_ADAPTER')
    private readonly paymentProcessorHealthCheckAdapter: IHealthCheckPaymentProcessor,
  ) {}

  async getPaymentProcessorStatus(): Promise<PaymentProcessorStatusResponse> {
    const { fallbackProcessorStatus, mainProcessorStatus } =
      await this.paymentProcessorHealthCheckAdapter.checkHealth();

    return new PaymentProcessorStatusResponse(
      mainProcessorStatus,
      fallbackProcessorStatus,
    );
  }
}
