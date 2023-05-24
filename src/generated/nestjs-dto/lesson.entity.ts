
import {ApiProperty} from '@nestjs/swagger'
import {Course} from './course.entity'
import {Test} from './test.entity'


export class Lesson {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
course_id: number ;
course?: Course ;
title: string ;
presentation_url: string ;
lecture_url: string ;
test?: Test  | null;
}
