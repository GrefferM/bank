import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID
} from 'class-validator';

export class DeleteOperationDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  operation_id: string;
}
