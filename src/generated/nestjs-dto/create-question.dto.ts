
import {QuestionType} from '@prisma/client'
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateQuestionDto {
  text: string;
@ApiProperty({
  enum: QuestionType,
})
type: QuestionType;
}
