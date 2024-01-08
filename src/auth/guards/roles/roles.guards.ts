import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../../../common/enum/role.enum";
import { ROLES_KEY } from "src/common/decorator/role.decorator";


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}


   
    canActivate(context: ExecutionContext):boolean{
        const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
            context.getHandler(),
            context.getClass(),
          ]);
        //  context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        console.log(user.role)

        return  isRoledMatched(roles, user.role)
        //the user.role is coming from database based on the user role
    }

    
}

const isRoledMatched =  (roles, userRole)=>{
        if (!roles.includes(userRole)) {
            return false
        }
        return true
}