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

    @Prop({required: true})
    password: string

    @Prop()
    dateOfBirth: string

    @Prop({required: true})
    age: number

    @Prop({enum: Role, default: Role.STUDENT})
    roles: Role

    @Prop({type: String, enum: Gender})
    gender: Gender

    @Prop({required: true})
    studentReg: string;

    @Prop({default: null})
    profilePicture?: string;

    @Prop({default: null})
    cloudinary_id?: string;

    @Prop({ type: String, enum: Class, required: true})
    current_class: Class;

    @Prop({type: String, enum: MyLeveled, required: true})
    leveled: string;

    @Prop({default: false, type: Boolean})
    schoolFees: boolean

    @Prop({type: Boolean, default: false})
    suspended: boolean

    @Prop({type: Boolean, default: false})
    finished: boolean
}

export const StudentSchema = SchemaFactory.createForClass(Student)