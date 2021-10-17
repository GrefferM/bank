import { IDBResponse } from './db.response.interface';
import { Account } from './../src/entity/Account';

export interface IResponseAccount extends IDBResponse {
  data: Account;
}
