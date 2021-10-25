import { Connection } from 'typeorm';
import { AccountType } from './../../entity/AccountType';
import { DATABASE_CONNECTION, ACCOUNT_TYPE_REPOSITORY } from './../../constants';

export const accountTypeProviders = [
  {
    provide: ACCOUNT_TYPE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(AccountType),
    inject: [DATABASE_CONNECTION],
  },
];