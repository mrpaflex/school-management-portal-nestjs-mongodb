import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Gender, StaffEnum } from "../enum/staff.enum";

export type StaffDocument = HydratedDocument<Staff>
@Schema()
export class Staff {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({type: String, enum: Gender, default: Gender.FEMALE})
    gender: Gender;

    @Prop({type: String, enum: StaffEnum, default: StaffEnum.NO_TEACHER})
    staff: StaffEnum;

    @Prop({type: Boolean, default: false})
    principal: boolean;

    @Prop({type: Boolean, default: false})
    principalApproved: boolean;

    @Prop({type: Boolean, default: false})
    resigned: boolean

    @Prop({type: Boolean, default: false})
    sacked: boolean

}

export const StaffSchema = SchemaFactory.createForClass(Staff)