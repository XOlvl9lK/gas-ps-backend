import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../entities/User'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { RefreshToken } from '../../entities/RefreshToken'

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
    JwtModule.register({})
  ],
  exports: [AuthService]
})
export class AuthModule {}
