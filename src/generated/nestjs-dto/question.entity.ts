
import {QuestionType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Test} from './test.entity'
import {Answer} from './answer.entity'
import {StudentAnswer} from './studentAnswer.entity'


export class Question {
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
text: string ;
@ApiProperty({
  enum: QuestionType,
})
type: QuestionType ;
answers?: Answer[] ;
}
