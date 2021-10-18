import { Module } from '@nestjs/common';
import { operationTypeProviders } from './operation-type.providers';
import { OperationTypeService } from './operation-type.service';
import { DatabaseModule } from './../../service/database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [
    ...operationTypeProviders,
    OperationTypeService
  ],
  exports: [
    OperationTypeService
  ]
})
export class OperationTypeModule { }
