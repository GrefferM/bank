import { Module } from '@nestjs/common';
import { balanceProviders } from './balance.providers';
import { BalanceService } from './balance.service';
import { DatabaseModule } from './../../service/database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [
    ...balanceProviders,
    BalanceService
  ],
  exports: [
    BalanceService
  ]
})
export class BalanceModule { }
