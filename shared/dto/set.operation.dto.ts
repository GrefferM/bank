import { ApiProperty } from '@nestjs/swagger';
import {
  IsPositive,
  IsNumber,
  IsUUID,
  IsString
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SetOperationDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  @IsString()
  payer_id: string;

  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  @IsString()
  recipient_id: string;

  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: type_id }) => parseInt(type_id))
  @IsPositive()
  @IsNumber()
  type_id: number;
}
