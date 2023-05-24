
import {ApiProperty} from '@nestjs/swagger'


export class TestSessionDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
  
}
