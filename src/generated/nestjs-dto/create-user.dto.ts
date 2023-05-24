
import {Role} from '@prisma/client'
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateUserDto {
  name: string;
@ApiProperty({
  enum: Role,
})
role: Role;
email: string;
password: string;
}
