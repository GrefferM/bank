import { Module } from '@nestjs/common';
import { accountProviders } from './account.providers';
import { accountTypeProviders } from './../account-type/account-type.providers';
import { userProviders } from './../user/user.providers';
import { employeeProviders } from './../employee/employee.providers';
import { AccountService } from './account.service';
import { DatabaseModule } from './../../service/database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [
    ...accountProviders,
    ...accountTypeProviders,
    ...userProviders,
    ...employeeProviders,
    AccountService
  ],
  exports: [
    AccountService
  ]
})
export class AccountModule { }
