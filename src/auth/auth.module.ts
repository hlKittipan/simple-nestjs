import { Module } from '@nestjs/common';
import { UsersModule } from '@/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from '@/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '@/schemas/user.module';
import { LocalStrategy } from './local.auth';
import { jwtConstants } from './constants';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConstants),
    UsersModule,
    PassportModule,
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    ConfigModule,
  ],
  providers: [AuthService, UsersService, LocalStrategy],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
