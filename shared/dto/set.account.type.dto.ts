import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  Length,
  IsString,
  IsBoolean
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SetAccountTypeDTO {
  @ApiProperty({
    type: String,
    required: true
  })
  @Length(2, 32)
  @IsString()
  title: string;

  @ApiProperty({
    type: Boolean,
    required: true
  })
  @Transform(({ value: debit }) => {
    switch (debit.toString()) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        throw new HttpException('Виникла помилка, не всі поля заповнені, або дані вказано не вірно.', 400);
    }
  })
  @IsBoolean()
  debit: boolean;
}
