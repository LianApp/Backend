import { ApiProperty } from "@nestjs/swagger";

export class Quesion {
  @ApiProperty()
  id: number;

  @ApiProperty()
  text: string
  
}
