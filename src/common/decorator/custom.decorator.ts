import { ExecutionContext, createParamDecorator } from "@nestjs/common";

//this is actually to get current logged in user in a restapi
export const GetUser = createParamDecorator(
    (data: never, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
       //console.log(request.user)
      return request.user;
    },
  );