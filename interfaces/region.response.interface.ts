import { IDBResponse } from './db.response.interface';
import { Region } from './../src/entity/Region';

export interface IResponseRegion extends IDBResponse {
  data: Region;
}
