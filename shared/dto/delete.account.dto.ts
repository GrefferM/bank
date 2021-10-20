import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
} from 'class-validator';

export class DeleteAccountDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  account_id: string;
}
