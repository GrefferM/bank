import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID
} from 'class-validator';

export class GetAccountDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  id: string;
}
