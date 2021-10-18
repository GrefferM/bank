import { Connection } from 'typeorm';
import { City } from './../../entity/City';
import { DATABASE_CONNECTION, OPERATION_REPOSITORY } from './../../constants';

export const operationProviders = [
  {
    provide: OPERATION_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(City),
    inject: [DATABASE_CONNECTION],
  },
];