
import {ApiProperty} from '@nestjs/swagger'


export class OrganizationDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
name: string ;
type: string ;
}
