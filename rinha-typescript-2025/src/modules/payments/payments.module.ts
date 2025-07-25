import { FactoryProvider, Module } from '@nestjs/common';
import {
  CreatePaymentService,
  PaymentsSummaryService,
  PurgePaymentsService,
} from '@payments/services';
import { DataSource } from 'typeorm';
import { Payment } from '@payments/entities';
import {
  IPaymentRepository,
  PaymentRepositoryTypeormRepository,
} from '@payments/repository';
import { HttpModule } from '@nestjs/axios';
import {
  CreatePaymentController,
  PaymentsSummaryController,
  PurgeController,
} from '@payments/controllers';
import { BullModule } from '@nestjs/bullmq';
import { ProcessPaymentProcessor } from '@payments/processors';
import { RinhaPaymentProcessorAdapter } from '@payments/adapters';
import { ServerType } from '@payments/types';
import { ConfigService } from '@nestjs/config';
import { PaymentProcessorType } from '@payments/protocols';
import { PaymentHealthCheckModule } from '@payment-health-check/payment-health-check.module';

const paymentRepositoryFactory: FactoryProvider = {
  inject: [DataSource],
  provide: 'PAYMENT_REPOSITORY',
  useFactory(dataSource: DataSource): IPaymentRepository {
    const paymentRepository = dataSource.getMongoRepository(Payment);
    return new PaymentRepositoryTypeormRepository(paymentRepository);
  },
};
const rinhaPaymentProcessorAdapter: FactoryProvider = {
  provide: 'PAYMENT_PROCESSOR_ADAPTER',
  useFactory: function (configService: ConfigService): PaymentProcessorType {
    const rinhaDefaultUrl = configService.getOrThrow<string>(
      'PAYMENT_PROCESSOR_URL_DEFAULT',
    );
    const fallbackUrl: string = configService.getOrThrow<string>(
      'PAYMENT_PROCESSOR_URL_FALLBACK',
    );
    const servers: Array<ServerType> = [
      {
        host: 'default',
        url: rinhaDefaultUrl,
      },
      {
        host: 'fallback',
        url: fallbackUrl,
      },
    ];
    const token: string = configService.getOrThrow<string>('RINHA_TOKEN');
    return new RinhaPaymentProcessorAdapter(servers, token);
  },
  inject: [ConfigService],
};
@Module({
  controllers: [
    CreatePaymentController,
    PaymentsSummaryController,
    PurgeController,
  ],
  imports: [
    PaymentHealthCheckModule,
    // DatabaseModule,
    HttpModule,
    BullModule.registerQueue({
      name: 'process-payment-queue',
      defaultJobOptions: {
        attempts: 3,
        removeOnFail: true,
        removeOnComplete: {
          count: 1000,
          age: 3600,
        },
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    }),
  ],
  providers: [
    paymentRepositoryFactory,
    rinhaPaymentProcessorAdapter,
    CreatePaymentService,
    PaymentsSummaryService,
    ProcessPaymentProcessor,
    PurgePaymentsService,
  ],
})
export class PaymentsModule {}
