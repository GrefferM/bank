import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive
} from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteOperationTypeDTO {
  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: type_id }) => parseInt(type_id))
  @IsPositive()
  @IsNumber()
  type_id: number;
}
