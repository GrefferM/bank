import { Connection } from 'typeorm';
import { City } from './../../entity/City';
import { DATABASE_CONNECTION, ACCOUNT_TYPE_REPOSITORY } from './../../constants';

export const accountTypeProviders = [
  {
    provide: ACCOUNT_TYPE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(City),
    inject: [DATABASE_CONNECTION],
  },
];