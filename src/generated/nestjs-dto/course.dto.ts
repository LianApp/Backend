
import {ApiProperty} from '@nestjs/swagger'


export class CourseDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
icon: string ;
title: string ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
subject_id: number ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
teacher_id: number ;
}
