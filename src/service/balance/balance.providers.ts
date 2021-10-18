import { Connection } from 'typeorm';
import { City } from './../../entity/City';
import { DATABASE_CONNECTION, BALANCE_REPOSITORY } from './../../constants';

export const balanceProviders = [
  {
    provide: BALANCE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(City),
    inject: [DATABASE_CONNECTION],
  },
];