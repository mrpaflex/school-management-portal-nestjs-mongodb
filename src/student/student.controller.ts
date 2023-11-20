import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDTO } from './dto/createStudent.dto';
import { UpdateDTO } from './dto/update.student.dto';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService){}

    @Post('create')
    async createAccount(@Body() input: CreateStudentDTO){
        return await this.studentService.createAccount(input)
    }

    @Get('findallstudents')
    async findallstudent(){
        return this.studentService.findallstudent()
    }

    @Get('suspended')
    async studentSuspended(){
        return this.studentService.studentSuspended()
    }

    @Get('findone')
     async findOneStudentByRegNo(@Body('regno') regno: string) {
  
  return await this.studentService.findOneStudentByReNo(regno);
}

    @Get('notpaidfees')
    async findfeesStudents(){
        return await this.studentService.findStudentThatHasNotPayFees()
    }

    @Get('paidfees')
    async studentPaidFees(){
        return await this.studentService.studentsPaidFees()
    }

    @Get('finishedwithfees')
    async studentsFinishedWithFees(){
        return await this.studentService.studentFinishedWithFees()
    }

    @Put()
    async updateProfile(@Param('regno') regno: string, @Body() body: UpdateDTO){
        return await this.studentService.updateStudentsProfile(regno, body)
    }
}
