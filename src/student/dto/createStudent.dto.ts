import { IsDate, IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
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

    @IsEmpty()
    password: string

    @IsNotEmpty()
    @IsDate()
    dateOfBirth: string

    @IsEmpty()
    studentReg: string;

    @IsNotEmpty()
    @IsNumber()
    age: number

    @IsString()
    @IsEnum(Gender)
    gender: Gender

    @IsString()
    @IsNotEmpty()
    @IsEnum(Class)
    current_class: Class

    @IsNotEmpty()
    @IsEnum(MyLeveled)
    leveled: MyLeveled

}