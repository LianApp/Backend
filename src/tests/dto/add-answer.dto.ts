import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  questionId: number;
  
  @ApiProperty()
  @IsNotEmpty()
  answerId: number;
}
