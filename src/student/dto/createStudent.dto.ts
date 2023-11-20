import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { Class, Gender, MyLeveled } from "../enum/classes.enum"

export class CreateStudentDTO{
    @IsNotEmpty()
    firstName: string

    middleName: string

    @IsNotEmpty()
    lastName: string
    @IsNotEmpty()
    @IsEmail()
    email: string

    password: string

    @IsNotEmpty()
    dateOfBirth: string

    studentReg: string;

    @IsNotEmpty()
    age: number

    @IsString()
    gender: Gender

    @IsString()
    @IsNotEmpty()
    class: Class

    @IsNotEmpty()
    leveled: string

}