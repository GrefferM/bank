import { Module } from '@nestjs/common';
import { operationProviders } from './operation.providers';
import { operationTypeProviders } from './../operation-type/operation-type.providers';
import { userProviders } from './../user/user.providers';
import { OperationService } from './operation.service';
import { DatabaseModule } from './../../service/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...operationProviders,
    ...operationTypeProviders,
    ...userProviders,
    OperationService
  ],
  exports: [
    OperationService
  ]
})
export class OperationModule { }
