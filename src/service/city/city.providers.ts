import { Connection } from 'typeorm';
import { City } from './../../entity/City';
import { DATABASE_CONNECTION, CITY_REPOSITORY } from './../../constants';

export const cityProviders = [
  {
    provide: CITY_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(City),
    inject: [DATABASE_CONNECTION],
  },
];