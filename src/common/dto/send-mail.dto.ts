import { IsNotEmpty } from "class-validator";
import { AddStudentDto } from "src/users/dto/add-students.dto";

export class SendMailDto extends AddStudentDto {
  @IsNotEmpty()
  password: string
}
