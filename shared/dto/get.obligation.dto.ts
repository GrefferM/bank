import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID
} from 'class-validator';

export class GetObligationDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  id: string;
}
