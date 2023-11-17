import { Gender } from "../enum/staff.enum";

export class UpdateStaffDto{
    firstName: string;
    lastName: string;
    gender: Gender;
}