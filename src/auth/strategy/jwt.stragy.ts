import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { JwtPayLoad } from "src/common/interface/jwt.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private authService: AuthService,
        private configService: ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
        
    }

    async validate(payload: JwtPayLoad){
        const user = await this.authService.generateJwt(payload.user)
        //console.log(user)
        if (!user) {
           // throw new UnauthorizedException();
            return null;
        }
        return user
    }

  
}