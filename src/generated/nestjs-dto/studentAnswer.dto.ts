
import {ApiProperty} from '@nestjs/swagger'


export class StudentAnswerDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
}
