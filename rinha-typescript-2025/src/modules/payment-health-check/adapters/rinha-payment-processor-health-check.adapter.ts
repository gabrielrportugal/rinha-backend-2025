import { IHealthCheckPaymentProcessor } from '@payment-health-check/protocols';
import { Logger } from '@nestjs/common';
import {
  PaymentProcessorStatusResponse,
  RinhaHealthCheckResponseDto,
} from '@payment-health-check/dtos';
import axios from 'axios';

export class RinhaPaymentProcessorHealthCheckAdapter
  implements IHealthCheckPaymentProcessor
{
  private readonly logger = new Logger(
    RinhaPaymentProcessorHealthCheckAdapter.name,
  );

  constructor(
    private readonly paymentProcessorHealthCheckUrlMain: string,
    private readonly paymentProcessorHealthCheckUrlFallback: string,
  ) {}

  async checkHealth(): Promise<PaymentProcessorStatusResponse> {
    const serverStatusResponse: PaymentProcessorStatusResponse = {
      mainProcessorStatus: null,
      fallbackProcessorStatus: null,
    };
    await this.makeRequest(serverStatusResponse, 'mainProcessorStatus');
    await this.makeRequest(serverStatusResponse, 'fallbackProcessorStatus');
    return serverStatusResponse;
  }

  private async makeRequest(
    serverStatusResponse: PaymentProcessorStatusResponse,
    server: 'mainProcessorStatus' | 'fallbackProcessorStatus',
  ) {
    const url =
      server === 'mainProcessorStatus'
        ? this.paymentProcessorHealthCheckUrlMain
        : this.paymentProcessorHealthCheckUrlFallback;
    console.log(url);
    try {
      const response = await axios.get<RinhaHealthCheckResponseDto>(url);
      this.logger.debug(
        `${server} processor status: ${JSON.stringify(response.data)}`,
      );
      serverStatusResponse[server] = response.data;
    } catch (e) {
      this.logger.error(e);
      serverStatusResponse[server] = {
        failing: true,
        minResponseTime: 0,
      };
    }
  }
}
