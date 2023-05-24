
import {ApiProperty} from '@nestjs/swagger'
import {Question} from './question.entity'
import {StudentAnswer} from './studentAnswer.entity'


export class Answer {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
question_id: number ;
question?: Question ;
text: string ;
correct: boolean ;
StudentAnswer?: StudentAnswer[] ;
}
