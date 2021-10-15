import { Module } from '@nestjs/common';
import { CityController } from './controllers/city.controller';
import { RegionController } from './controllers/region.controller';
import { UserController } from './controllers/user.controller';
import { CityModule } from './service/city/city.module';
import { RegionModule } from './service/region/region.module';
import { UserModule } from './service/user/user.module';

@Module({
  imports: [
    RegionModule,
    CityModule,
    UserModule
  ],
  controllers: [
    CityController,
    RegionController,
    UserController
  ],
  providers: [],
})
export class AppModule { }
