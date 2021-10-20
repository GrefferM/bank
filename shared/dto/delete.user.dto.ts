import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID
} from 'class-validator';

export class DeleteUserDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  user_id: string;
}
