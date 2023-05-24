
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateSessionResultDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
total: number;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
correct: number;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
percentage: number;
}
