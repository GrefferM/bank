import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNumber,
  IsString,
  IsPhoneNumber,
  IsEmail,
  Length,
  IsPositive
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  user_id: string;

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
  @IsString()
  phone: string;

  @ApiProperty({
    type: String,
    required: true
  })
  @IsEmail()
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
  @Transform(({ value: city_id }) => parseInt(city_id))
  @IsPositive()
  @IsNumber()
  city_id: number;
}
