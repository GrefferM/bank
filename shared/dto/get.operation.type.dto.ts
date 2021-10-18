import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber, 
  IsPositive
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetOperationTypeDTO {
  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: id }) => parseInt(id))
  @IsPositive()
  @IsNumber()
  id: number;
}
