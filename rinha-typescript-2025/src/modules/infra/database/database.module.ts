import { Module } from '@nestjs/common';
import { databaseProviders } from '@database/services';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
