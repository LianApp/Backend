import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail } from 'class-validator'

export class AddStudentDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "Student name"
  })
  name: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "Student work email"
  })
  email: string

  @IsNotEmpty()
  @ApiProperty({
    description: "Group id"
  })
  groupId: number
}

export class AddStudentsDto {
  @ApiProperty()
  data: AddStudentDto[]
}
