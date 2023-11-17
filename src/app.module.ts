import { Module } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [StaffModule, StudentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
