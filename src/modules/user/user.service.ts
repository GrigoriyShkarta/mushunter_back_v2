import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './response';
import { ChangeMainInfoDto } from './dto/changeMainInfo.dto';
import { userSelect } from './utils/user.select';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserResponse> {
    return await this.prisma.user.create({
      data: {
        id: data.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data?.lastName,
        avatar: data?.avatarUrl,
      },
      select: userSelect,
    });
  }

  async findByEmail(email: string): Promise<UserResponse | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: userSelect,
    });

    return user;
  }

  async findById(id: string): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async changeMainInfo(
    data: ChangeMainInfoDto,
    userId: string,
  ): Promise<UserResponse> {
    const {
      firstName,
      lastName,
      age,
      links,
      telephone,
      description,
      styles,
      cityId,
    } = data;

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          firstName,
          lastName,
          age,
          links,
          telephone,
          description,
          city: cityId ? { connect: { id: cityId } } : undefined,
          styles: styles && {
            set: [],
            connect: styles.map((styleId) => ({ id: styleId })),
          },
        },
        include: {
          city: true,
          styles: true,
        },
      });

      return updatedUser;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw new Error('Failed to update user');
    }
  }

  async googleAuth(data: CreateUserDto): Promise<boolean> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!existingUser) {
      await this.create(data);
    }

    return true;
  }
}
