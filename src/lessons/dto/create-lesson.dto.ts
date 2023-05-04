import { ApiProperty } from "@nestjs/swagger";

export class CreateLessonDto {
  @ApiProperty()
  title: string;
  
  @ApiProperty({type: 'string', format: 'binary'})
  presentation: any;
  
  @ApiProperty({type: 'string', format: 'binary'})
  lecture: any;
}
