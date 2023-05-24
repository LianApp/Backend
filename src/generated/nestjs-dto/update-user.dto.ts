
import {Role} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateUserDto {
  name?: string;
@ApiProperty({
  enum: Role,
})
role?: Role;
email?: string;
password?: string;
}
