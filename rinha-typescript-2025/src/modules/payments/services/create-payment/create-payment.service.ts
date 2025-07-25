import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICreatePayment } from '@payments/protocols';
import { CreatePaymentRequestDto } from '@payments/dtos';
import { IPaymentRepository } from '@payments/repository/payment-repository.protocol';
import { Payment } from '@payments/entities';
import { Host } from '@payments/types';

@Injectable()
export class CreatePaymentService {
  private readonly logger = new Logger(CreatePaymentService.name);
  constructor(
    @Inject('PAYMENT_REPOSITORY')
    private readonly paymentRepository: IPaymentRepository,
    @Inject('PAYMENT_PROCESSOR_ADAPTER')
    private readonly createPaymentAdapter: ICreatePayment,
  ) {}

  async execute(
    input: CreatePaymentRequestDto,
    server: Host,
  ): Promise<Payment> {
    try {
      const requestedAt = new Date();
      this.logger.debug(`Registering payment: ${JSON.stringify(input)}`);
      const { source } = await this.createPaymentAdapter.execute(input, server);
      return await this.paymentRepository.createPayment(
        input.correlationId,
        input.amount,
        requestedAt,
        source,
      );
    } catch (e) {
      this.logger.error(
        `Error in ${server} payment processor, errorMessage: ${e.message}`,
      );
      throw e;
    }
  }
}
