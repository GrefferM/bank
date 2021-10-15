import { Connection } from 'typeorm';
import { Region } from './../../entity/Region';
import { DATABASE_CONNECTION, REGION_REPOSITORY } from './../../constants';

export const regionProviders = [
  {
    provide: REGION_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Region),
    inject: [DATABASE_CONNECTION],
  },
];