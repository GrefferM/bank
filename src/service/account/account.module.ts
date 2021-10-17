import { Module } from '@nestjs/common';
import { accountProviders } from './account.providers';
import { AccountService } from './account.service';
import { DatabaseModule } from './../../service/database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [
    ...accountProviders,
    AccountService
  ],
  exports: [
    AccountService
  ]
})
export class AccountModule { }
