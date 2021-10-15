import { IDBResponse } from './db.response.interface';
import { City } from './../src/entity/City';

export interface IResponseCity extends IDBResponse {
  data: City;
}
