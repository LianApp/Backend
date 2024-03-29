import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  organizationId: number

  @IsNotEmpty()
  groupId: number
}
