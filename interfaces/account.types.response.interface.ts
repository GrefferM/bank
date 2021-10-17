import { IDBResponse } from './db.response.interface';
import { AccountType } from './../src/entity/AccountType';

export interface IResponseAccountTypes extends IDBResponse {
  data: AccountType[];
}
