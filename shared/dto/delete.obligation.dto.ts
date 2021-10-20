import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID
} from 'class-validator';

export class DeleteObligationDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  obligation_id: string;
}
