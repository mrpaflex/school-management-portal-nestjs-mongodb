import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Category, Gender } from "../enum/category.enum";

export class StaffDto{
    @IsNotEmpty()
    @IsString()
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
    
    @IsNotEmpty()
    @IsEnum(Category)
    category: Category


    @IsOptional()
    @IsEnum(Gender)
    gender: Gender

   
}