import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID
} from 'class-validator';

export class GetOperationDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  id: string;
}
