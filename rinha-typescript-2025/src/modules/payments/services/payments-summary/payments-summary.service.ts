import { Inject, Injectable, Logger } from '@nestjs/common';
import { IPaymentRepository } from '@payments/repository';
import { PaymentsData, PaymentsSummaryResponseDto } from '@payments/dtos';
import { Payment } from '@payments/entities';

@Injectable()
export class PaymentsSummaryService {
  private readonly logger = new Logger(PaymentsSummaryService.name);
  constructor(
    @Inject('PAYMENT_REPOSITORY')
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async execute(to?: Date, from?: Date): Promise<PaymentsSummaryResponseDto> {
    this.logger.debug(`Get payments summary: ${JSON.stringify({ to, from })}`);
    const defaultPayments = await this.paymentRepository.getPaymentsSummary(
      'default',
      to,
      from,
    );
    const fallbackPayments = await this.paymentRepository.getPaymentsSummary(
      'fallback',
      to,
      from,
    );

    const paymentsSummary = new PaymentsSummaryResponseDto(
      this.parsePaymentData(defaultPayments),
      this.parsePaymentData(fallbackPayments),
    );
    this.logger.log(`Get payments summary: ${JSON.stringify(paymentsSummary)}`);
    return paymentsSummary;
  }

  private parsePaymentData(payments: Payment[]): PaymentsData {
    const totalRequests = payments.length;
    const totalAmount = payments.reduce((acc, p) => acc + p.amount, 0);
    return new PaymentsData(totalRequests, totalAmount);
  }
}
