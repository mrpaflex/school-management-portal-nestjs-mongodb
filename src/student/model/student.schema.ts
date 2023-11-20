import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Class, Gender, MyLeveled } from "../enum/classes.enum";

@Schema()
export class Student extends Document{

    @Prop()
    firstName: string

    @Prop({default: ''})
    middleName?: string

    @Prop()
    lastName: string

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    dateOfBirth: string

    @Prop()
    age: number

    @Prop({type: String, enum: Gender})
    gender: Gender

    @Prop()
    studentReg: string;

    @Prop({ type: String, enum: Class})
    current_class: Class;

    @Prop()
    leveled: string;

    @Prop({default: false, type: Boolean})
    schoolFees: boolean

    @Prop({type: Boolean, default: false})
    suspended: boolean

    @Prop({type: Boolean, default: false})
    finished: boolean

    @Prop({type: Date, default: Date.now})
    date: Date
}

export const StudentSchema = SchemaFactory.createForClass(Student)