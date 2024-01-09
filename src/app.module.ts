import { Module } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles/roles.guards';

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
  
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
 // providers: [],
})
export class AppModule {}
