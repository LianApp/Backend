
import {ApiProperty} from '@nestjs/swagger'
import {Course} from './course.entity'
import {User} from './user.entity'
import {Organization} from './organization.entity'


export class Group {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
name: string ;
courses?: Course[] ;
students?: User[] ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
organization_id: number ;
organization?: Organization ;
}
