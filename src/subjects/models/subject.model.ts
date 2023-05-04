import { ApiProperty } from "@nestjs/swagger";

export class Subject {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  organization_id: number;
}
