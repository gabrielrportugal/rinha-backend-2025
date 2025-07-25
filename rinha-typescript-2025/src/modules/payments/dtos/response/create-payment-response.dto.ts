export class CreatePaymentResponseDto {
  message: string;
  source: string;
  constructor(message: string, source: string) {
    this.message = message;
    this.source = source;
  }
}
