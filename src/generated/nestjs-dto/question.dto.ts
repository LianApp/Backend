
import {QuestionType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import { AnswerDto } from './answer.dto';


export class QuestionDto {
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
text: string ;
@ApiProperty({
  enum: QuestionType,
})
type: QuestionType;
@ApiProperty({ type: AnswerDto, isArray: true })
answer: AnswerDto[]
}
