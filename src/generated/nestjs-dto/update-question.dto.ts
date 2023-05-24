
import {QuestionType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateQuestionDto {
  text?: string;
@ApiProperty({
  enum: QuestionType,
})
type?: QuestionType;
}
