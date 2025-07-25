import { IPaymentRepository } from '@payments/repository';
import { MongoRepository } from 'typeorm';
import { Payment } from '@payments/entities';
import { InjectRepository } from '@nestjs/typeorm';

export class PaymentRepositoryTypeormRepository implements IPaymentRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: MongoRepository<Payment>,
  ) {}

  async createPayment(
    correlationId: string,
    amount: number,
    requestedAt: Date,
    source: string,
  ): Promise<Payment> {
    const newPayment = this.paymentRepository.create({
      correlationId,
      amount,
      requestedAt,
      source,
    });
    return await this.paymentRepository.save(newPayment);
  }

  async getPaymentsSummary(
    source: string,
    to?: Date,
    from?: Date,
  ): Promise<Payment[]> {
    const query: any = {
      source: source,
    };
    if (from) {
      query.requestedAt = { ...query.requestedAt, $gte: from };
    }
    if (to) {
      query.requestedAt = { ...query.requestedAt, $lte: to };
    }
    return await this.paymentRepository.find({ where: query });
  }

  async purgePayments(): Promise<void> {
    await this.paymentRepository.clear();
  }
}
