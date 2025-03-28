import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.quard';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, FirebaseService, FirebaseAuthGuard],
})
export class UserModule {}
