import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { CreatePaymentRequestDto } from '@payments/dtos';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Controller('payments')
export class CreatePaymentController {
  private logger = new Logger(CreatePaymentController.name);
  constructor(
    @InjectQueue('process-payment-queue')
    private readonly processPaymentQueue: Queue,
  ) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async execute(
    @Body() input: CreatePaymentRequestDto,
  ): Promise<{ ok: boolean }> {
    this.logger.log(`Adding payment to a queue: ${JSON.stringify(input)}`);
    await this.processPaymentQueue.add('process-payment', input);
    return {
      ok: true,
    };
  }
}
