import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  accessToken: string;

  refreshToken: string;
}
