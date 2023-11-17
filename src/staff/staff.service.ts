import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StaffDto } from './dto/staff.dto';
import { Staff } from './model/staff.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateStaffDto } from './dto/update.staff.dtp';

@Injectable()
export class StaffService {
    constructor(@InjectModel(Staff.name)
    private staffModel: Model<Staff>
    ){}
async createaccount(input: StaffDto) {
    const staff = await this.staffModel.findOne({ email: input.email })
    if (staff){
        throw new HttpException('you are a staff already', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const createStaff = await this.staffModel.create({
        ...input
    })

    await createStaff.save()

    return createStaff
    }

    async updateUser(id: string, updateInput: UpdateStaffDto) {
        const staff = await this.staffModel.findByIdAndUpdate({id}, {$set: updateInput })

        if (!staff) {
            throw new HttpException('you have to logged to update', HttpStatus.FORBIDDEN)
        }

        return staff;
    }

   async findstaffs() {return await this.staffModel.find({ resigned: false,   sacked: false}).exec() }


  async findOneStaff(id: string) {
   return await this.staffModel.findById(id).exec()
}

}
