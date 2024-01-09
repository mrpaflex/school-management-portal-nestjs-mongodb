import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {  Document} from "mongoose";
import { Category, Gender } from "../enum/category.enum";
import { Role } from "src/common/enum/role.enum";

@Schema({timestamps: true})
export class Staff extends Document {
    @Prop({required: true})
    firstName: string;

    @Prop({required: true})
    lastName: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({type: String, enum: Role, default: Role.STAFF})
    roles: Role[];

    @Prop({type: String, enum: Gender, default: Gender.FEMALE})
    gender: Gender;


    @Prop({type: String, enum: Category, required: true})
    category: Category;

    // @Prop({type: Boolean, default: false})
    // principal: boolean;
    @Prop({default: null})
    profilePicture?: string;

    @Prop({default: null})
    cloudinary_id?: string;

    @Prop({type: Boolean, default: false})
    isPrincipal: boolean;

    @Prop({type: Boolean, default: false})
    resigned: boolean

    @Prop({type: Boolean, default: false})
    sacked: boolean

    @Prop({type: Boolean, default: false})
    suspended: boolean

}

export const StaffSchema = SchemaFactory.createForClass(Staff)