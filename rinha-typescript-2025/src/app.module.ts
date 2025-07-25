import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PaymentsModule } from '@payments/payments.module';
import { BullModule } from '@nestjs/bullmq';
import * as process from 'node:process';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '@payments/entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule para usar ConfigService
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGO_URI'),
        synchronize: true,
        logging: true,
        entities: [Payment],
        useUnifiedTopology: true,
      }),
      inject: [ConfigService], // Injeta ConfigService no useFactory
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: 6379,
      },
    }),
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
