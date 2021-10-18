import { Module } from '@nestjs/common';
import { obligationProviders } from './obligation.providers';
import { userProviders } from './../user/user.providers';
import { employeeProviders } from './../employee/employee.providers';
import { ObligationService } from './obligation.service';
import { DatabaseModule } from './../../service/database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [
    ...obligationProviders,
    ...userProviders,
    ...employeeProviders,
    ObligationService
  ],
  exports: [
    ObligationService
  ]
})
export class ObligationModule { }
