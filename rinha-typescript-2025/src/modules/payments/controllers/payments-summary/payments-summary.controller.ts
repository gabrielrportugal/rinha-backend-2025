import { Controller, Get, Query } from '@nestjs/common';
import { PaymentsSummaryResponseDto } from '@payments/dtos';
import { PaymentsSummaryService } from '@payments/services';

@Controller('payments-summary')
export class PaymentsSummaryController {
  constructor(
    private readonly paymentsSummaryService: PaymentsSummaryService,
  ) {}

  @Get()
  async execute(
    @Query('to') to?: Date,
    @Query('from') from?: Date,
  ): Promise<PaymentsSummaryResponseDto> {
    const toDate = to ? new Date(to) : undefined;
    const fromDate = from ? new Date(from) : undefined;
    return await this.paymentsSummaryService.execute(toDate, fromDate);
  }
}
