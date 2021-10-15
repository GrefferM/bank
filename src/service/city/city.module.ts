import { Module } from '@nestjs/common';
import { cityProviders } from './city.providers';
import { regionProviders } from './../../service/region/region.providers';
import { CityService } from './city.service';
import { DatabaseModule } from './../../service/database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [
    ...cityProviders,
    ...regionProviders,
    CityService
  ],
  exports: [
    CityService
  ]
})
export class CityModule { }
