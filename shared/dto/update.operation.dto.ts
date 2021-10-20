import { ApiProperty } from '@nestjs/swagger';
import {
  IsPositive,
  IsNumber,
  IsUUID
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateOperationDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  operation_id: string;

  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  payer_id: string;

  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  recipient_id: string;

  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: type_id }) => parseInt(type_id))
  @IsPositive()
  @IsNumber()
  type_id: number;

  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: amount }) => parseInt(amount))
  @IsPositive()
  @IsNumber()
  amount: number;
}
