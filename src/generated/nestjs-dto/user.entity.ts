
import {Role} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Organization} from './organization.entity'
import {Group} from './group.entity'
import {Subject} from './subject.entity'
import {TestSession} from './testSession.entity'


export class User {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
name: string ;
@ApiProperty({
  enum: Role,
})
role: Role ;
email: string ;
password: string ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
organization_id: number ;
organization?: Organization ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
group_id: number  | null;
group?: Group  | null;
subjects?: Subject[] ;
testSessions?: TestSession[] ;
}
