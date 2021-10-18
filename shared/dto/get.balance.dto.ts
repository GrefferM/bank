import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID
} from 'class-validator';

export class GetBalanceDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  id: string;
}
