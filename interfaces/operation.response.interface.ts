import { IDBResponse } from './db.response.interface';
import { Operation } from './../src/entity/Operation';

export interface IResponseOperation extends IDBResponse {
  data: Operation;
}
