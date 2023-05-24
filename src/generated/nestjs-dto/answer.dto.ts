
import {ApiProperty} from '@nestjs/swagger'


export class AnswerDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
text: string ;
correct: boolean ;
}
