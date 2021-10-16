import { IDBResponse } from './db.response.interface';
import { User } from './../src/entity/User';

export interface IResponseUsers extends IDBResponse {
  data: User[];
}
