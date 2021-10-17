import { Module } from '@nestjs/common';
import { CityModule } from './service/city/city.module';
import { RegionModule } from './service/region/region.module';
import { UserModule } from './service/user/user.module';
import { EmployeeModule } from './service/employee/employee.module';
import { AccountModule } from './service/account/account.module';
import { AccountTypeModule } from './service/account-type/account-type.module';
import { CityController } from './controllers/city.controller';
import { RegionController } from './controllers/region.controller';
import { UserController } from './controllers/user.controller';
import { EmployeeController } from './controllers/employee.controller';
import { AccountController } from './controllers/account.controller';
import { AccountTypeController } from './controllers/account.type.controller';

@Module({
  imports: [
    RegionModule,
    CityModule,
    UserModule,
    EmployeeModule,
    AccountModule,
    AccountTypeModule
  ],
  controllers: [
    CityController,
    RegionController,
    UserController,
    EmployeeController,
    AccountController,
    AccountTypeController
  ],
  providers: [],
})
export class AppModule { }
