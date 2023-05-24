import { QuestionDto } from "src/generated/nestjs-dto/question.dto";
import { TestDto } from "src/generated/nestjs-dto/test.dto";

export class Test extends TestDto {
  questions: QuestionDto
  
}
