import 'reflect-metadata';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { BaseModel } from 'src/common/models/base.model';
import { Role } from '@prisma/client';
import { ApiHideProperty } from '@nestjs/swagger';


export class User extends BaseModel {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  role: Role = "STUDENT";

  @ApiHideProperty()
  password: string;

  organizationId: number;

  groupId: number;
}
