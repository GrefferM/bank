import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../../interfaces/user.interface';

export class GetAccountEntity {
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
      type: 1,
      user: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
      employee: '5dec5770-2d8c-11ec-8d3d-0242ac130003',
      balance: 1,
      created: new Date().toString()
    }
  })
  data: IUser;
}
