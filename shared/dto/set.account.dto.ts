import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNumber,
  IsString,
  IsPositive
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SetAccountDTO {
  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: city }) => parseInt(city))
  @IsPositive()
  @IsNumber()
  type: number;

  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  @IsString()
  user: string;

  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  @IsString()
  employee: string;
}
