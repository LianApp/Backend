
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateCourseDto {
  title: string;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
subject_id: number;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
teacher_id: number;
}
