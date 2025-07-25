import { DataSource } from 'typeorm';
import { Payment } from '@payments/entities';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

export const connectionMongo: MongoConnectionOptions = {
  entities: [Payment],
  host: 'localhost',
  logging: true,
  port: 27017,
  synchronize: true,
  type: 'mongodb',
  username: null,
  password: null,
};

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(connectionMongo);
      return dataSource.initialize();
    },
  },
];
