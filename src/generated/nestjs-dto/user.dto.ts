
import {Role} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class UserDto {
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
}
