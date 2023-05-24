import { ApiProperty } from "@nestjs/swagger";
import { QuestionType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, MaxLength, MinLength, ValidateNested } from "class-validator";
import { AnswerEntity } from "src/teachers/entities/answer.entity";

export class AddQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ type: AnswerEntity, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerEntity)
  answers: AnswerEntity[]

  @ApiProperty({ enum: QuestionType })
  @IsNotEmpty()
  type: QuestionType
}
