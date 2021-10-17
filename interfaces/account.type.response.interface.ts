import { IDBResponse } from './db.response.interface';
import { AccountType } from './../src/entity/AccountType';

export interface IResponseAccountType extends IDBResponse {
  data: AccountType;
}
