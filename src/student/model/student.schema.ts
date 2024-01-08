import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Class, Gender, MyLeveled } from "../enum/classes.enum";
import { Role } from "src/common/enum/role.enum";

@Schema({timestamps: true})
export class Student extends Document{

    @Prop({required: true})
    firstName: string

    @Prop({default: null})
    middleName?: string

    @Prop({required: true})
    lastName: string

    @Prop({required: true, unique: true})
    email: string

    @Prop()
    password: string

    @Prop()
    dateOfBirth: string

    @Prop()
    age: number

    @Prop({enum: Role, default: Role.STUDENT})
    roles: Role

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
}

export const StudentSchema = SchemaFactory.createForClass(Student)