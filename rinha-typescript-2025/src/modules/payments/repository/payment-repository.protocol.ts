import { Payment } from '@payments/entities';

export interface IPaymentRepository {
  createPayment(
    correlationId: string,
    amount: number,
    requestedAt: Date,
    source: string,
  ): Promise<Payment>;
  getPaymentsSummary(
    source: string,
    to?: Date,
    from?: Date,
  ): Promise<Payment[]>;

  purgePayments(): Promise<void>;
}
