import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber, 
  IsPositive
} from 'class-validator';

export class GetAccountDTO {
  @ApiProperty({
    type: Number,
    required: true
  })
  @IsPositive()
  @IsNumber()
  id: number;
}
