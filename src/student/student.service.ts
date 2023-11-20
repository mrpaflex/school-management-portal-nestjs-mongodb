import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDTO } from './dto/createStudent.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './model/student.schema';
import { Model } from 'mongoose';
import { authGeneratePassword } from './authpassword/password.auth';
import { hashed } from 'src/auth/hashed/password.hashed';
import { generateRandomCode } from 'src/common/regno/student.reg';
import { UpdateDTO } from './dto/update.student.dto';


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
    return await this.studentModel.find({
       // finished: false
    }).exec()
    }
    async studentSuspended() {
        return await this.studentModel.find({
            suspended: true,
            finished: false
        })
    }

    async findOneStudentByReNo(regno: string) {
       const student= await this.studentModel.findOne({
        studentReg: regno
       }).exec()
       return student
       
    }

    async findStudentThatHasNotPayFees() {
     const studentwithfees = await this.studentModel.find({
        schoolFees: false,
        finished: false
     })
     return studentwithfees;
    }

    async studentsPaidFees() {
       const nofeesStudents = await this.studentModel.find({
        schoolFees: true,
        finished: false
       })
       return nofeesStudents;
    }

    async studentFinishedWithFees() {
       const finishedStudents = await this.studentModel.find({
        finished: true,
        schoolFees: false
       }) 

       return finishedStudents;
    }

    // async updateStudentsProfile(_id: string, body: UpdateDTO) {
    //     const student = await this.studentModel.findByIdAndUpdate({_id}, {$set: body})
    //     return student
    // }

    async updateStudentsProfile(_id: string, body: UpdateDTO) {
        const student = await this.studentModel.findByIdAndUpdate({_id}, {$set: body})
        return student
    }

    async findOneStudentByRegNoOrEmail(emailOrRegNo: string) {
        return await this.studentModel.findOne({
          $or: [
            { studentReg: emailOrRegNo },
            { email: emailOrRegNo },
          ],
        }).exec();
      }
      
      async findStudentById(id: string){
        return await this.studentModel.findById(id)
      }
}
