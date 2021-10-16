import { ApiProperty } from '@nestjs/swagger';
import { ICity } from '../../interfaces/city.interface';

export class GetCitiesEntity {
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
        id: 1,
        name: 'TEST',
        region: 1
      }
    ]
  })
  data: ICity[];
}
