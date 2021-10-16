import { IDBResponse } from './db.response.interface';
import { Region } from './../src/entity/Region';

export interface IResponseRegions extends IDBResponse {
  data: Region[];
}
