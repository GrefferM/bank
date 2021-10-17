import { Connection } from 'typeorm';
import { User } from './../../entity/User';
import { DATABASE_CONNECTION, EMPLOYEE_REPOSITORY } from './../../constants';

export const employeeProviders = [
  {
    provide: EMPLOYEE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DATABASE_CONNECTION],
  },
];