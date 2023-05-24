import { ApiProperty } from "@nestjs/swagger";

export class Group {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string;

  @ApiProperty()
  organization_id: number;

}
