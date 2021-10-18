import { IDBResponse } from './db.response.interface';
import { OperationType } from './../src/entity/OperationType';

export interface IResponseOperationType extends IDBResponse {
  data: OperationType;
}
