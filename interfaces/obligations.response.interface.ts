import { IDBResponse } from './db.response.interface';
import { Obligation } from './../src/entity/Obligation';

export interface IResponseObligations extends IDBResponse {
  data: Obligation[];
}
