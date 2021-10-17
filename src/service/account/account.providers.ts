import { Connection } from 'typeorm';
import { User } from './../../entity/User';
import { DATABASE_CONNECTION, ACCOUNT_REPOSITORY } from './../../constants';

export const accountProviders = [
  {
    provide: ACCOUNT_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DATABASE_CONNECTION],
  },
];