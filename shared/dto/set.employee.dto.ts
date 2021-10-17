import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsPhoneNumber,
  IsEmail,
  Length,
  IsPositive
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SetEmployeeDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @Length(5, 64)
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true
  })
  @IsPhoneNumber('UA')
  @Length(7, 15)
  @IsString()
  phone: string;

  @ApiProperty({
    type: String,
    required: true
  })
  @IsEmail()
  @Length(5, 64)
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    required: true
  })
  @Length(5, 64)
  @IsString()
  address: string;

  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: city }) => parseInt(city))
  @IsPositive()
  @IsNumber()
  city: number;
}
