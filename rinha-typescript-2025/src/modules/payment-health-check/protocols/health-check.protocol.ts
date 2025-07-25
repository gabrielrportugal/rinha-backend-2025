import { PaymentProcessorStatusResponse } from '@payment-health-check/dtos';

export interface IHealthCheckPaymentProcessor {
  checkHealth(): Promise<PaymentProcessorStatusResponse>;
}
