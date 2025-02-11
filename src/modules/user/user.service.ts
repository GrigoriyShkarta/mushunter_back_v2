import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './response';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserResponse> {
    return await this.prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data?.lastName,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  async googleAuth(data: CreateUserDto): Promise<boolean> {
    const existingUser = await this.findByEmail(data.email);

    if (!existingUser) {
      await this.create(data);
    }

    return true;
  }
}
