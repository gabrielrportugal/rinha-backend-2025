import {
  CreatePaymentRequestDto,
  CreatePaymentResponseDto,
} from '@payments/dtos';
import { Host } from '@payments/types';

export interface ICreatePayment {
  execute(
    input: CreatePaymentRequestDto,
    server: Host,
  ): Promise<CreatePaymentResponseDto>;
}

export interface IPaymentsPurge {
  purge(): Promise<void>;
}

export type PaymentProcessorType = ICreatePayment & IPaymentsPurge;
