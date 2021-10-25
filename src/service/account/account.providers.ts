import { Connection } from 'typeorm';
import { Account } from './../../entity/Account';
import { DATABASE_CONNECTION, ACCOUNT_REPOSITORY } from './../../constants';

export const accountProviders = [
  {
    provide: ACCOUNT_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Account),
    inject: [DATABASE_CONNECTION],
  },
];