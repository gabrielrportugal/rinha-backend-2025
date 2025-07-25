import {
  CreatePaymentRequestDto,
  CreatePaymentResponseDto,
} from '@payments/dtos';
import { ICreatePayment, IPaymentsPurge } from '@payments/protocols';
import axios from 'axios';
import { Logger } from '@nestjs/common';
import { Host, ServerType } from '@payments/types';

export class RinhaPaymentProcessorAdapter
  implements ICreatePayment, IPaymentsPurge
{
  private logger = new Logger(RinhaPaymentProcessorAdapter.name);
  private readonly servers: Array<ServerType> = [];
  private readonly rinhaAdminToken: string;

  constructor(servers: Array<ServerType>, rinhaAdminToken: string) {
    this.servers = servers;
    this.rinhaAdminToken = rinhaAdminToken;
  }

  async purge(host: Host = 'default'): Promise<void> {
    await axios.post(this.getHostUrl(host) + '/admin/purge-payments', null, {
      headers: {
        'X-Rinha-Token': this.rinhaAdminToken,
      },
    });
  }

  async execute(
    input: CreatePaymentRequestDto,
    host: Host = 'default',
  ): Promise<CreatePaymentResponseDto> {
    try {
      this.logger.log(
        `Processing payment: ${JSON.stringify(input)}, host: ${host}`,
      );
      const response = await axios.post<CreatePaymentResponseDto>(
        this.getHostUrl(host) + '/payments',
        input,
      );
      return {
        ...response.data,
        source: host,
      };
    } catch (e) {
      this.logger.error(`Error in ${host} payment processor`);
      throw e;
    }
  }

  private getHostUrl(host: Host): string {
    const server = this.servers.find((s) => s.host === host);
    if (!server) {
      throw new Error('Server not found');
    }
    return server.url;
  }
}
