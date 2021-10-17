import { Module } from '@nestjs/common';
import { employeeProviders } from './employee.providers';
import { cityProviders } from './../../service/city/city.providers';
import { EmployeeService } from './employee.service';
import { DatabaseModule } from './../../service/database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [
    ...employeeProviders,
    ...cityProviders,
    EmployeeService
  ],
  exports: [
    EmployeeService
  ]
})
export class EmployeeModule { }
