import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Gender, StaffEnum } from "../enum/staff.enum";

export class StaffDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string
    @IsNotEmpty()
    @IsString()
    @MinLength(2,{message: 'fist name must be atleast two charaterz'})
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    gender: Gender
    
    staff: StaffEnum;

    principal: boolean
}