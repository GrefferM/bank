import { Connection } from 'typeorm';
import { Obligation } from './../../entity/Obligation';
import { DATABASE_CONNECTION, OBLIGATION_REPOSITORY } from './../../constants';

export const obligationProviders = [
  {
    provide: OBLIGATION_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Obligation),
    inject: [DATABASE_CONNECTION],
  },
];