import 'reflect-metadata';
import { IsEmail } from 'class-validator';
import { BaseModel } from 'src/common/models/base.model';
import { Role } from '@prisma/client';
import { ApiHideProperty } from '@nestjs/swagger';


export class User extends BaseModel {
  @IsEmail()
  email: string;

  firstname?: string;

  lastname?: string;

  role: Role;

  @ApiHideProperty()
  password: string;
}
