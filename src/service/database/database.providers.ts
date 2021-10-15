import { createConnection } from 'typeorm';
import { ConfigService } from './../config/config.service';
import { User } from "./../../../src/entity/User";
import { Employee } from "./../../../src/entity/Employee";
import { Account } from "./../../../src/entity/Account";
import { AccountType } from "./../../../src/entity/AccountType";
import { Operation } from "./../../../src/entity/Operation";
import { OperationType } from "./../../../src/entity/OperationType";
import { Obligation } from "./../../entity/Obligation";
import { Balance } from "./../../../src/entity/Balance";
import { City } from "./../../../src/entity/City";
import { Region } from "./../../../src/entity/Region";
import { DATABASE_CONNECTION } from './../../constants';

export const DatabaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (configService: ConfigService) => await createConnection({
      type: "postgres",
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [
        User,
        Employee,
        Operation,
        OperationType,
        Account,
        AccountType,
        Obligation,
        Balance,
        City,
        Region
      ],
      synchronize: true,
      logging: false
    }),
    inject: [ConfigService],
  },
];