import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/config';
import { FirebaseService } from './modules/firebase/firebase.service';
import { FirebaseModule } from './modules/firebase/firebase.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    FirebaseModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtStrategy, FirebaseService],
})
export class AppModule {}
