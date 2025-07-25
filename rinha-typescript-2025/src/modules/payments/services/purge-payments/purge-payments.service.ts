import { Inject, Injectable } from '@nestjs/common';
import { IPaymentsPurge } from '@payments/protocols';
import { IPaymentRepository } from '@payments/repository';

@Injectable()
export class PurgePaymentsService {
  constructor(
    @Inject('PAYMENT_PROCESSOR_ADAPTER')
    private readonly purgePaymentProcessor: IPaymentsPurge,
    @Inject('PAYMENT_REPOSITORY')
    private readonly paymentRepository: IPaymentRepository,
  ) {}
  async purge() {
    await this.paymentRepository.purgePayments();
    await this.purgePaymentProcessor.purge();
  }
}
