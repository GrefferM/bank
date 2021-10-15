import { Module } from '@nestjs/common';
import { userProviders } from './user.providers';
import { cityProviders } from './../../service/city/city.providers';
import { UserService } from './user.service';
import { DatabaseModule } from './../../service/database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    ...cityProviders,
    UserService
  ],
  exports: [
    UserService
  ]
})
export class UserModule { }
