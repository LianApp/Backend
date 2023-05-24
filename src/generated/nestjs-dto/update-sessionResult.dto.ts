
import {ApiProperty} from '@nestjs/swagger'




export class UpdateSessionResultDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
total?: number;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
correct?: number;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
percentage?: number;
}
