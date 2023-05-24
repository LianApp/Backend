
import {ApiProperty} from '@nestjs/swagger'


export class SubjectDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
name: string ;
}
