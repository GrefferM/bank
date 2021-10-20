import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID
} from 'class-validator';

export class DeleteEmployeeDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  employee_id: string;
}
