import { FactoryProvider, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GetPaymentProcessorStatusService } from '@payment-health-check/services';
import { HttpModule } from '@nestjs/axios';
import { RinhaPaymentProcessorHealthCheckAdapter } from '@payment-health-check/adapters/rinha-payment-processor-health-check.adapter';

const getPaymentProcessorFactory: FactoryProvider = {
  provide: 'GET_PAYMENT_PROCESSOR_STATUS_SERVICE',
  useFactory: function () {
    const healthEndpoint: string = 'payments/service-health';
    const paymentProcessorHealthCheckUrlMain =
      (process.env.PAYMENT_PROCESSOR_URL_DEFAULT ?? 'http://localhost:8001') +
      '/' +
      healthEndpoint;
    const paymentProcessorHealthCheckUrlFallback =
      (process.env.PAYMENT_PROCESSOR_URL_FALLBACK ?? 'http://localhost:8002') +
      '/' +
      healthEndpoint;
    const rinhaHealthCheckAdapter = new RinhaPaymentProcessorHealthCheckAdapter(
      paymentProcessorHealthCheckUrlMain,
      paymentProcessorHealthCheckUrlFallback,
    );

    return new GetPaymentProcessorStatusService(rinhaHealthCheckAdapter);
  },
};
/*
 * This module is used to check the health of the payment service.
 * The payment processors, this will handle the health check for all services and fallback services
 * To handle the health check status, we will use a background job, which will be responsible for constantly ping the
 * payment processors health endpoints.
 *
 * */
@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  providers: [
    getPaymentProcessorFactory,
    // PaymentHealthCheckCronService
  ],
  exports: [getPaymentProcessorFactory],
})
export class PaymentHealthCheckModule {}
