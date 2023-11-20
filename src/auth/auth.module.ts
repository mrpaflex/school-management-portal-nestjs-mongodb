import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StaffService } from 'src/staff/staff.service';
import { StaffModule } from 'src/staff/staff.module';
import { JwtStrategy } from './strategy/jwt.stragy';
import { JwtAuthGuard } from './guards/jwt.guards';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    StudentModule,
    StaffModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService:ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: '2m'}
      }),
      inject: [ConfigService],
    }), 
   
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, ConfigService],
 // exports: [AuthService]
})
export class AuthModule {}
