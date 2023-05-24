
import {ApiProperty} from '@nestjs/swagger'


export class SessionResultDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
total: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
correct: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
percentage: number ;
}
