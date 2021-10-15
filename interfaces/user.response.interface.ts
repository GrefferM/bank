import { IDBResponse } from './db.response.interface';
import { User } from './../src/entity/User';

export interface IResponseUser extends IDBResponse {
  data: User;
}
