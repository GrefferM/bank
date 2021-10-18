import { ApiProperty } from '@nestjs/swagger';
import { IObligation } from '../../interfaces/obligation.interface';

export class GetObligationEntity {
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
      id: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
      user: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
      employee: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
      percent: 1,
      insurance: 1,
      current_amount: 1,
      total_amount: 1,
      finished: true,
      debt: true,
      next_payment: new Date().toString(),
      created_at: new Date().toString(),
      finished_at: new Date().toString()
    }
  })
  data: IObligation;
}
