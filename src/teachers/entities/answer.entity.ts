import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AnswerEntity {
  @ApiProperty()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  correct: boolean;
}
