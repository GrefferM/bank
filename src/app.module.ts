import { Module } from '@nestjs/common';
import { CityModule } from './service/city/city.module';
import { RegionModule } from './service/region/region.module';
import { UserModule } from './service/user/user.module';
import { EmployeeModule } from './service/employee/employee.module';
import { ObligationModule } from './service/obligation/obligation.module';
import { BalanceModule } from './service/balance/balance.module';
import { OperationModule } from './service/operation/operation.module';
import { OperationTypeModule } from './service/operation-type/operation-type.module';
import { AccountModule } from './service/account/account.module';
import { AccountTypeModule } from './service/account-type/account-type.module';
import { CityController } from './controllers/city.controller';
import { RegionController } from './controllers/region.controller';
import { UserController } from './controllers/user.controller';
import { EmployeeController } from './controllers/employee.controller';
import { ObligationController } from './controllers/obligation.controller';
import { BalanceController } from './controllers/balance.controller';
import { OperationController } from './controllers/operation.controller';
import { OperationTypeController } from './controllers/operation.type.controller';
import { AccountController } from './controllers/account.controller';
import { AccountTypeController } from './controllers/account.type.controller';

@Module({
  imports: [
    RegionModule,
    CityModule,
    UserModule,
    EmployeeModule,
    ObligationModule,
    BalanceModule,
    OperationModule,
    OperationTypeModule,
    AccountModule,
    AccountTypeModule
  ],
  controllers: [
    RegionController,
    CityController,
    UserController,
    EmployeeController,
    ObligationController,
    BalanceController,
    OperationController,
    OperationTypeController,
    AccountController,
    AccountTypeController
  ],
  providers: [],
})
export class AppModule { }
