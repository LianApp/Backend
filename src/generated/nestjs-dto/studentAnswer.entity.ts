
import {ApiProperty} from '@nestjs/swagger'
import {TestSession} from './testSession.entity'
import {Question} from './question.entity'
import {Answer} from './answer.entity'


export class StudentAnswer {
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
session?: TestSession ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
question_id: number ;
question?: Question ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
answer_id: number ;
answer?: Answer ;
}
