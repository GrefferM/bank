import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNumber,
  IsPositive
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateAccountDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  account_id: string;

  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: type_id }) => parseInt(type_id))
  @IsPositive()
  @IsNumber()
  type_id: number;

  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  user_id: string;

  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  employee_id: string;
}
