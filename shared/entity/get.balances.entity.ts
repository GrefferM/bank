import { ApiProperty } from '@nestjs/swagger';
import { IBalance } from './../../interfaces/balance.interface';

export class GetBalancesEntity {
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
    example: [
      {
        id: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
        amount: 1,
        debt: true
      }
    ]
  })
  data: IBalance[];
}
