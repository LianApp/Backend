
import {ApiProperty} from '@nestjs/swagger'
import {TestSession} from './testSession.entity'


export class SessionResult {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
session_id: number ;
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
