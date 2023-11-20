import { Body, Controller, Get, Post, UseGuards, Req, Res } from '@nestjs/common';
import { StaffLoginDto } from 'src/staff/dto/staff.login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guards';
import { GetUser } from 'src/common/decorator/custom.decorator';
import { StudentLoginDTO } from 'src/student/dto/login.student.dto';


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
        return user
    }

    @Post('loginstudent')
    async loginStudent(@Body() body: StudentLoginDTO){
        return await this.authservice.loginStudent(body)
    }
    // @Get('profile')
    // @UseGuards(JwtAuthGuard)
    // async currentUserProfile(@Req() req){
    //     return 'my love'
    //     //res.user
    // }
}
