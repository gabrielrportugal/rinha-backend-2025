import { Controller, Post } from '@nestjs/common';
import { PurgePaymentsService } from '@payments/services';

@Controller('purge-payments')
export class PurgeController {
  constructor(private readonly purgePaymentsService: PurgePaymentsService) {}
  @Post()
  async purge() {
    await this.purgePaymentsService.purge();
  }
}
