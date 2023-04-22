import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserEntity = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  })
