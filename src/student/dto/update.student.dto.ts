import { PartialType } from "@nestjs/swagger";
import { Student } from "../model/student.schema";

export class UpdateDTO extends PartialType(Student){}