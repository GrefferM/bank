import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsPositive,
  IsNumber,
  IsBoolean
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SetBalanceDTO {
  @ApiProperty({
    type: Number,
    required: true
  })
  @Transform(({ value: amount }) => parseFloat(amount))
  @IsPositive()
  @IsNumber()
  amount: number;

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
