import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { StaffLoginDto } from 'src/staff/dto/staff.login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guards';
import { GetUser } from 'src/common/decorator/custom.decorator';


@Controller('auth')
export class AuthController {

    constructor(
        private authservice: AuthService
){}

    @Post('loginstaff')
    async signin(@Body() body: StaffLoginDto){
        return this.authservice.singinStaff(body)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async currentUserProfile(@GetUser() user){
        //return 'my love'
        return user
    }
}
