import { Connection } from 'typeorm';
import { City } from './../../entity/City';
import { DATABASE_CONNECTION, OBLIGATION_REPOSITORY } from './../../constants';

export const obligationProviders = [
  {
    provide: OBLIGATION_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(City),
    inject: [DATABASE_CONNECTION],
  },
];