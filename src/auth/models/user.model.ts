import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client"
import { IsEmail } from "class-validator";

export class UserGroup {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

export class UserModel {
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  name: string;
  
  @ApiProperty({enum: Role})
  role: Role;
  
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiHideProperty()
  password: string;

  @ApiProperty({ type: () => UserGroup })
  group: UserGroup

}
