import { Connection } from 'typeorm';
import { Operation } from './../../entity/Operation';
import { DATABASE_CONNECTION, OPERATION_REPOSITORY } from './../../constants';

export const operationProviders = [
  {
    provide: OPERATION_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Operation),
    inject: [DATABASE_CONNECTION],
  },
];