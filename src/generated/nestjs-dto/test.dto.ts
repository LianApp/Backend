import {ApiProperty} from '@nestjs/swagger'


export class TestDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
id: number ;
title: string ;
}
