import { ApiProperty } from '@nestjs/swagger';
import {
  Length,
  IsNumber,
  IsString,
  IsPositive
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SetOperationTypeDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @Length(4, 32)
  @IsString()
  title: string;

  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: commission }) => parseFloat(commission))
  @IsPositive()
  @IsNumber()
  commission: number;
}
