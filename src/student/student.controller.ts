import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDTO } from './dto/createStudent.dto';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService){}

    @Post('create')
    async createAccount(@Body() input: CreateStudentDTO){
        return await this.studentService.createAccount(input)
    }

    @Get()
    async findallstudent(){
        return this.studentService.findallstudent()
    }

    @Get()
    async studentSuspended(){
        return this.studentService.studentSuspended()
    }
}
