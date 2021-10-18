import { IDBResponse } from './db.response.interface';
import { Balance } from './../src/entity/Balance';

export interface IResponseBalance extends IDBResponse {
  data: Balance;
}
