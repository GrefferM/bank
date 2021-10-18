import { IDBResponse } from './db.response.interface';
import { Balance } from './../src/entity/Balance';

export interface IResponseBalances extends IDBResponse {
  data: Balance[];
}
