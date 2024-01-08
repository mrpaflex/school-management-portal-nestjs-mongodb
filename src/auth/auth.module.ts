import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StaffService } from 'src/staff/staff.service';
import { StaffModule } from 'src/staff/staff.module';
import { JwtStrategy } from './strategy/jwt.stragy';
import { JwtAuthGuard } from './guards/jwt.guards';
import { StudentModule } from 'src/student/student.module';
import { RolesGuard } from './guards/roles/roles.guards';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from 'src/student/model/student.schema';
import { Staff, StaffSchema } from 'src/staff/model/staff.schema';

@Module({
  imports: [
   // PassportModule,
   PassportModule.register({
    global:true,
    defaultStrategy: 'jwt'
  }),

  // MongooseModule.forFeature([{
  //   name: Student.name, schema: StudentSchema
  // }]),

  // MongooseModule.forFeature([{
  //   name: Staff.name, schema: StaffSchema
  // }]),
  
    StudentModule,
    StaffModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService:ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: '20s'}
      }),
      inject: [ConfigService],
    }), 
   
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, ConfigService],
 exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}
