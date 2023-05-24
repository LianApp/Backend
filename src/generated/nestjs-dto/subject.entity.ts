
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'
import {Organization} from './organization.entity'


export class Subject {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
name: string ;
teachers?: User[] ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
organization_id: number ;
organization?: Organization ;
}
