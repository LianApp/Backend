
import {ApiProperty} from '@nestjs/swagger'
import {Lesson} from './lesson.entity'
import {Question} from './question.entity'
import {TestSession} from './testSession.entity'


export class Test {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
@ApiProperty()
title: string ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
lesson_id: number ;
lesson?: Lesson ;
questions?: Question[] ;
sessions?: TestSession[] ;
}
