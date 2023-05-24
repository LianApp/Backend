
import {ApiProperty} from '@nestjs/swagger'
import {Group} from './group.entity'
import {Lesson} from './lesson.entity'


export class Course {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
icon: string ;
title: string ;
groups?: Group[] ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
subject_id: number ;
lessons?: Lesson[] ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
teacher_id: number ;
}
