
import {ApiProperty} from '@nestjs/swagger'
import {Test} from './test.entity'
import {User} from './user.entity'
import {StudentAnswer} from './studentAnswer.entity'
import {SessionResult} from './sessionResult.entity'


export class TestSession {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
test_id: number ;
student_id: number ;
results?: SessionResult[] ;
}
