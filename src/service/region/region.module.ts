import { Module } from '@nestjs/common';
import { regionProviders } from './region.providers';
import { RegionService } from './region.service';
import { DatabaseModule } from './../../service/database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [
    ...regionProviders,
    RegionService
  ],
  exports: [
    RegionService
  ]
})
export class RegionModule { }
