import { IDBResponse } from './db.response.interface';
import { OperationType } from './../src/entity/OperationType';

export interface IResponseOperationTypes extends IDBResponse {
  data: OperationType[];
}
