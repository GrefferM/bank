import { IDBResponse } from './db.response.interface';
import { Account } from './../src/entity/Account';

export interface IResponseAccounts extends IDBResponse {
  data: Account[];
}
