import { IDBResponse } from './db.response.interface';
import { City } from './../src/entity/City';

export interface IResponseCities extends IDBResponse {
  data: City[];
}
