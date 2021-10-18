import { IDBResponse } from './db.response.interface';
import { Obligation } from './../src/entity/Obligation';

export interface IResponseObligation extends IDBResponse {
  data: Obligation;
}
