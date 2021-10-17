import { Module } from '@nestjs/common';
import { accountTypeProviders } from './account-type.providers';
import { AccountTypeService } from './account-type.service';
import { DatabaseModule } from './../../service/database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [
    ...accountTypeProviders,
    AccountTypeService
  ],
  exports: [
    AccountTypeService
  ]
})
export class AccountTypeModule { }
