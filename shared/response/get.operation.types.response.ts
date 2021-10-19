import { ApiProperty } from '@nestjs/swagger';
import { IOperationType } from '../../interfaces/operation.type.interface';

export class GetOperationTypesResponse {
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
    example: [{
      id: 1,
      title: 'TEST',
      commission: 1
    }]
  })
  data: IOperationType[];
}
