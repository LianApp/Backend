
import {ApiProperty} from '@nestjs/swagger'
import { TestDto } from './test.dto';


export class LessonDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
@ApiProperty()
title: string ;
@ApiProperty()
presentation_url: string ;
@ApiProperty()
lecture_url: string ;
@ApiProperty({type: () => TestDto})
test: TestDto
}
