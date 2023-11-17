import { Module } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    
    MongooseModule.forRootAsync({
      useFactory: async (confService: ConfigService)=>({
        uri: confService.get('MONGODB_URI')
      }),
      inject: [ConfigService]
    }),
    
    StaffModule, StudentModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
