import { IDBResponse } from './db.response.interface';
import { Employee } from './../src/entity/Employee';

export interface IResponseEmployee extends IDBResponse {
  data: Employee;
}
