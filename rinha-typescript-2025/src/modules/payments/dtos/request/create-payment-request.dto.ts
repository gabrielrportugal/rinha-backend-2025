import { IsNumber, IsUUID } from 'class-validator';

export class CreatePaymentRequestDto {
  @IsUUID()
  correlationId: string;
  @IsNumber()
  amount: number;
  constructor(correlationId: string, amount: number) {
    this.correlationId = correlationId;
    this.amount = amount;
  }
}
