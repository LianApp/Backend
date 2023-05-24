
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'
import {Subject} from './subject.entity'
import {Group} from './group.entity'


export class Organization {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
name: string ;
type: string ;
users?: User[] ;
subjects?: Subject[] ;
groups?: Group[] ;
}
