import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber, 
  IsPositive
} from 'class-validator';

export class GetAccountTypeDTO {
  @ApiProperty({
    type: Number,
    required: true
  })
  @IsPositive()
  @IsNumber()
  id: number;
}
