import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive
} from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteRegionDTO {
  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: region_id }) => parseInt(region_id))
  @IsPositive()
  @IsNumber()
  region_id: number;
}
