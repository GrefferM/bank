import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive
} from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteCityDTO {
  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: city_id }) => parseInt(city_id))
  @IsPositive()
  @IsNumber()
  city_id: number;
}
