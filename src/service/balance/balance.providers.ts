import { Connection } from 'typeorm';
import { Balance } from './../../entity/Balance';
import { DATABASE_CONNECTION, BALANCE_REPOSITORY } from './../../constants';

export const balanceProviders = [
  {
    provide: BALANCE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Balance),
    inject: [DATABASE_CONNECTION],
  },
];