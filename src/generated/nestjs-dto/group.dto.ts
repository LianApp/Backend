
import {ApiProperty} from '@nestjs/swagger'


export class GroupDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
name: string ;
}
