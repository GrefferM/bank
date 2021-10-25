import { Connection } from 'typeorm';
import { Employee } from './../../entity/Employee';
import { DATABASE_CONNECTION, EMPLOYEE_REPOSITORY } from './../../constants';

export const employeeProviders = [
  {
    provide: EMPLOYEE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Employee),
    inject: [DATABASE_CONNECTION],
  },
];