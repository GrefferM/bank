import { Module } from '@nestjs/common';
import { CityModule } from './service/city/city.module';
import { RegionModule } from './service/region/region.module';
import { UserModule } from './service/user/user.module';
import { AccountModule } from './service/account/account.module';
import { CityController } from './controllers/city.controller';
import { RegionController } from './controllers/region.controller';
import { UserController } from './controllers/user.controller';
import { AccountController } from './controllers/account.controller';

@Module({
  imports: [
    RegionModule,
    CityModule,
    UserModule,
    AccountModule
  ],
  controllers: [
    CityController,
    RegionController,
    UserController,
    AccountController
  ],
  providers: [],
})
export class AppModule { }
