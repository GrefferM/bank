import { IDBResponse } from './db.response.interface';
import { Employee } from './../src/entity/Employee';

export interface IResponseEmployes extends IDBResponse {
  data: Employee[];
}
