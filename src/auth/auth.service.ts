import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StaffLoginDto } from 'src/staff/dto/staff.login.dto';
import { StaffService } from 'src/staff/staff.service';
import { comparedPassword } from './hashed/password.hashed';
import { Staff } from 'src/staff/model/staff.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Staff.name)
        private staffModel: Model<Staff>,
        private staffService: StaffService,
        private jwtService: JwtService
){}

async singinStaff(body: StaffLoginDto) {
    const staff = await this.staffService.findStaffByEmail(body.email)


    if (!staff) {
        throw new HttpException('check your email and password', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    if (await comparedPassword(body.password, staff.password) === false) {
        throw new HttpException('check your password and email', HttpStatus.UNPROCESSABLE_ENTITY)

    }
    const payload = {
       staff
       // staff: staff._id

    }
    
    return {
        accessToken: this.jwtService.sign(payload)
    }
}

// async generateJwt(id: string){
//    const user = await this.staffService.findOneStaff(id)
//    //console.log(user)
//    return user;
// }
async generateJwt(id: string){
    console.log(id)
    const user = await this.staffModel.findOne({_id: id}).exec()
    //console.log(user)
    return user;
 }

}
