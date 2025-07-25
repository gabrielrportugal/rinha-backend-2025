import { RinhaHealthCheckResponseDto } from '@payment-health-check/dtos/rinha-health-check-response.dto';

export class PaymentProcessorStatusResponse {
  mainProcessorStatus: RinhaHealthCheckResponseDto;
  fallbackProcessorStatus: RinhaHealthCheckResponseDto;
  constructor(
    mainProcessorStatus: RinhaHealthCheckResponseDto,
    fallbackProcessorStatus: RinhaHealthCheckResponseDto,
  ) {
    this.mainProcessorStatus = mainProcessorStatus;
    this.fallbackProcessorStatus = fallbackProcessorStatus;
  }
}
