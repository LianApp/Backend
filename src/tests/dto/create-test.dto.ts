import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTestDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
}
