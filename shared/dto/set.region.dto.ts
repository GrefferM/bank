import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length
} from 'class-validator';

export class SetRegionDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @Length(4, 32)
  @IsString()
  title: string;
}
