import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDTO } from './dto/createStudent.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './model/student.schema';
import { Model } from 'mongoose';
import { authGeneratePassword } from './authpassword/password.auth';
import { hashed } from 'src/auth/hashed/password.hashed';
import { generateRandomCode } from 'src/common/regno/student.reg';


@Injectable()
export class StudentService {


    constructor(@InjectModel(Student.name)
    private studentModel: Model<Student>
    ){}
    async createAccount(input: CreateStudentDTO) {
        const student = await this.studentModel.findOne({
            email: input.email
        })
        if (student) {
            throw new HttpException('your have account already', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        input.studentReg = await generateRandomCode(input.leveled)
        console.log(input.studentReg)
        input.password = await authGeneratePassword()
        console.log(input.password)

        input.password = await hashed(input.password)
        const createStudentAccount = await this.studentModel.create({
            ...input
        })

        return createStudentAccount.save()
    }

   async findallstudent() {
    return await this.studentModel.find()
    }
    async studentSuspended() {
        return await this.studentModel.find({
            suspended: true
        })
    }

}
