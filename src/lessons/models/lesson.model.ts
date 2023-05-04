import { ApiProperty } from "@nestjs/swagger";

export class LessonModel {
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  course_id: number;
  
  @ApiProperty()
  title: string;
  
  @ApiProperty()
  presentation_url: string;
  
  @ApiProperty()
  lecture_url: string;
}
