import { ApiProperty } from '@nestjs/swagger';
import { IRegion } from '../../interfaces/region.interface';

export class GetRegionResponse {
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
      title: 'TEST'
    }
  })
  data: IRegion;
}
