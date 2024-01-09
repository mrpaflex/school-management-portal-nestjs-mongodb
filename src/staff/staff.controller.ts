import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffDto } from './dto/staff.dto';
import { UpdateStaffDto } from './dto/update.staff.dtp';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/uploadImages/multer';

@Controller('staff')
export class StaffController {

    constructor(private staffService: StaffService){}

    @Post('create')
    async createAcc(@Body() staff: StaffDto){
        return await this.staffService.createaccount(staff)
    }

    @Put('update')
    async updateUser(@Param() id: string, updateInput: UpdateStaffDto){
        return this.staffService.updateUser(id, updateInput)
    }

    @Get('allstaff')
    async findstaffs(){
        return await this.staffService.findstaffs()
    }

    @Get('onestaff/:id')
    findOneStaff(@Param('id') id: string){
        return this.staffService.findOneStaff(id)
    }

    @Put('passport/:id')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async uploadPassport(@Param('id') id: string, @UploadedFile() file: Express.Multer.File){
        const upload = await this.staffService.uploadPassport(id, file);
        return upload;
    }
}
