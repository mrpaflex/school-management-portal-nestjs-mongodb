import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StaffLoginDto } from 'src/staff/dto/staff.login.dto';
import { StaffService } from 'src/staff/staff.service';
import { comparedPassword } from './hashed/password.hashed';
import { Staff } from 'src/staff/model/staff.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentLoginDTO } from 'src/student/dto/login.student.dto';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class AuthService {
    
    constructor(
        // @InjectModel(Staff.name)
        // private staffModel: Model<Staff>,
        private staffService: StaffService,
        private jwtService: JwtService,
        private studentService: StudentService
){}

async singinStaff(body: StaffLoginDto) {
    const user = await this.staffService.findStaffByEmail(body.email)


    if (!user) {
        throw new HttpException('check your email and password', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    if (await comparedPassword(body.password, user.password) === false) {
        throw new HttpException('check your password and email', HttpStatus.UNPROCESSABLE_ENTITY)

    }
    const payload = {
       //user
       user: user._id

    }
    
    return {
        accessToken: await this.jwtService.signAsync(payload)
    }
}

async loginStudent(body: StudentLoginDTO) {
    const user = await this.studentService.findOneStudentByRegNoOrEmail(body.emailorReg);

    if (!user) {
        throw new HttpException('check your email and password', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    if (await comparedPassword(body.password, user.password) === false) {
        throw new HttpException('check your password and email', HttpStatus.UNPROCESSABLE_ENTITY)

    }
    return user;

}


async generateJwt(id: string){
   const user = await this.staffService.findOneStaff(id)
   //console.log(user)
   return user;
}


}
