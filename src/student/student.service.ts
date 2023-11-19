import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDTO } from './dto/createStudent.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './model/student.schema';
import { Model } from 'mongoose';
import { authGeneratePassword } from './authpassword/password.auth';
import { hashed } from 'src/auth/hashed/password.hashed';


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

        input.password = await authGeneratePassword()
        console.log(input.password)

        input.password = await hashed(input.password)
        const createStudentAccount = await this.studentModel.create({
            ...input
        })

        return createStudentAccount.save()
    }
}
