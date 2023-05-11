import { ApiProperty, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsEmail, ValidateNested, IsArray } from 'class-validator'

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

export class AddTeacherDto extends OmitType(AddStudentDto, ['groupId']) {
  
}

export class AddTeachersDto {
  @ApiProperty({type: AddTeacherDto, isArray: true})
  @IsArray()
  @ValidateNested({ each: true, always: true })
  @Type(() => AddTeacherDto)
  data: AddTeacherDto[]
}

export class AddStudentsDto {
  @ApiProperty({type: AddStudentDto, isArray: true})
  @IsArray()
  @ValidateNested({ each: true, always: true })
  @Type(() => AddStudentDto)
  data: AddStudentDto[]
}
