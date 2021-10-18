import { ApiProperty } from '@nestjs/swagger';
import { IOperation } from '../../interfaces/operation.interface';

export class GetOperationEntity {
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
      payer: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
      recipient: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
      type: 1,
      finished: true,
      created: new Date().toString()
    }
  })
  data: IOperation;
}
