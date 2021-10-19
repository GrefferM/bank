import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../../interfaces/user.interface';

export class GetUsersResponse {
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
        name: 'TEST',
        phone: '097-123-45-67',
        email: 'test@test.com',
        address: 'test street',
        city: 1
      }
    ]
  })
  data: IUser[];
}
