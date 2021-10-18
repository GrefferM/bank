import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsPositive,
  Length
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SetCityDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @Length(4, 64)
  @IsString()
  title: string;

  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: region_id }) => parseInt(region_id))
  @IsPositive()
  @IsNumber()
  region_id: number;
}
