import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsPositive,
  IsNumber,
  IsBoolean,
  IsUUID
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateObligationDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @IsUUID()
  obligation_id: string;

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
  @IsUUID()
  employee_id: string;

  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: percent }) => parseInt(percent))
  @IsPositive()
  @IsNumber()
  percent: number;

  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: insurance }) => parseInt(insurance))
  @IsPositive()
  @IsNumber()
  insurance: number;

  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: current_amount }) => parseInt(current_amount))
  @IsPositive()
  @IsNumber()
  current_amount: number;

  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: total_amount }) => parseInt(total_amount))
  @IsPositive()
  @IsNumber()
  total_amount: number;

  @ApiProperty({
    type: Boolean,
    required: true
  })
  @Transform(({ value: debt }) => {
    switch (debt.toString()) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        throw new HttpException('Виникла помилка, не всі поля заповнені, або дані вказано не вірно.', 400);
    }
  })
  @IsBoolean()
  debt: boolean;
}
