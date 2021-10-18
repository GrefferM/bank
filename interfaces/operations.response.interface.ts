import { IDBResponse } from './db.response.interface';
import { Operation } from './../src/entity/Operation';

export interface IResponseOperations extends IDBResponse {
  data: Operation[];
}
