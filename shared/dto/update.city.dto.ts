import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsPositive,
  Length
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCityDTO {
  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: city_id }) => parseInt(city_id))
  @IsPositive()
  @IsNumber()
  city_id: number;

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
