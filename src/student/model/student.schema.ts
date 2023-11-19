import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Class, Gender, Leveled } from "../enum/classes.enum";

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

    @Prop({ type: String, enum: Class})
    class: Class

    @Prop({type: String, enum: Leveled})
    level: Leveled

    @Prop({default: false, type: Boolean})
    schoolFees: boolean

    @Prop({type: Boolean, default: false})
    suspended: boolean

    @Prop({type: Date, default: Date.now})
    date: Date
}

export const StudentSchema = SchemaFactory.createForClass(Student)