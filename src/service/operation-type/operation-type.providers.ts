import { Connection } from 'typeorm';
import { OperationType } from './../../entity/OperationType';
import { DATABASE_CONNECTION, OPERATION_TYPE_REPOSITORY } from './../../constants';

export const operationTypeProviders = [
  {
    provide: OPERATION_TYPE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(OperationType),
    inject: [DATABASE_CONNECTION],
  },
];