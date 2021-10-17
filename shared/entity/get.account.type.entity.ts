import { ApiProperty } from '@nestjs/swagger';
import { IAccountType } from './../../interfaces/account.type.interface';

export class GetAccountTypeEntity {
  @ApiProperty({
    description: 'Response status',
    example: 200
  })
  status: number;

  @ApiProperty({
    description: 'Response message',
    example: 'Data success'
  })
  message: string;

  @ApiProperty({
    description: 'Response result',
    example: true
  })
  success: boolean;

  @ApiProperty({
    example: {
      id: 1,
      title: 'Test',
      debit: true
    }
  })
  data: IAccountType;
}
