import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { StaffDto } from './dto/staff.dto';
import { Staff } from './model/staff.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateStaffDto } from './dto/update.staff.dtp';
import { hashed } from 'src/auth/hashed/password.hashed';
import { cloudinary } from 'src/common/cloudinary/cloudinary';

@Injectable()
export class StaffService {
    constructor(@InjectModel(Staff.name)
    private staffModel: Model<Staff>
    ){}
async createaccount(input: StaffDto) {
    try {
        const staff = await this.staffModel.findOne({ email: input.email })
    if (staff){
        throw new HttpException('you are a staff already', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    input.password = await hashed(input.password)

    const createStaff = await this.staffModel.create({
        ...input
    })
    
    await createStaff.save()

    return createStaff
    } catch (error) {
        if (error instanceof HttpException) {
            throw error
            
        }
        console.log(error)
        throw new InternalServerErrorException('server error')
        
    }
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
   try {
    const staff = await this.staffModel.findById(id).exec()
    if (!staff) {
     throw new HttpException('staff with such id does not exit', HttpStatus.NOT_FOUND)
    }
    return staff
   } catch (error) {
    if (error instanceof HttpException) {
        throw error
    }
    throw new InternalServerErrorException('server error while running code', error.message)
   }

}

async findStaffByEmail(email: string) {
    return await this.staffModel.findOne({email: email}).exec()

}

async uploadPassport(id: string, file: Express.Multer.File): Promise<string> {
    try {

    const staff = await this.findOneStaff(id);
     if (!staff) {
      throw new HttpException('staff with such id does not exit', HttpStatus.NOT_FOUND)
     }

      const result = await cloudinary.uploader.upload(file.path)

         await this.staffModel.findByIdAndUpdate(id, {
            profilePicture: result.secure_url,
            cloudinary_id: result.public_id
        }, {
            new: true,
            runValidators: true
        });
        return 'passport uploaded successfully';

    } catch (error) {
        
        if (error instanceof HttpException) {
            throw error
        }
       
      throw new Error('Error uploading to Cloudinary: ' + error.message);
    }
  }

}
