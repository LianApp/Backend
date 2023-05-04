import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateCourseDto {

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  subjectId: number;
  
  @ApiProperty({type: 'number', isArray: true})
  groupIds: number[]

  @ApiProperty()
  @MaxLength(1)
  @MinLength(1)
  @IsNotEmpty()
  icon: string
}
