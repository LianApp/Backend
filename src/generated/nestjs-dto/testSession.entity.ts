
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
test?: Test ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
student_id: number ;
student?: User ;
answers?: StudentAnswer[] ;
results?: SessionResult[] ;
}
