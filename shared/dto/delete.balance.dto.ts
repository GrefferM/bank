import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID
} from 'class-validator';

export class DeleteBalanceDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  balance_id: string;
}
