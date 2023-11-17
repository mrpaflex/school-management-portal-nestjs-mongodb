import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from './model/staff.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Staff.name, schema: StaffSchema
    }])
  ],
  providers: [StaffService],
  controllers: [StaffController]
})
export class StaffModule {}
