import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserResponse } from './response';
import { ChangeMainInfoDto } from './dto/changeMainInfo.dto';
import { userSelect } from './utils/user.select';
import * as dayjs from 'dayjs';
import { UpdateSkillDto } from './dto/update-user-skill.dto';
import { AddUserSkillDto } from './dto/add-user-skill.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  CreateInSearchBandDto,
  CreateInSearchMusicianDto,
  UpdateInSearchBandDto,
  UpdateInSearchMusicianDto,
} from './dto/userInSerach.dto';

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
  ): Promise<boolean> {
    const {
      firstName,
      lastName,
      age,
      links,
      telephone,
      description,
      styles,
      city,
    } = data;

    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          firstName,
          lastName,
          age: age ? dayjs(age, 'DD-MM-YYYY').toDate() : null,
          links,
          telephone,
          description,
          city: city ? { connect: { id: city } } : undefined,
          styles: styles && {
            set: [],
            connect: styles.map((styleId) => ({ id: styleId })),
          },
        },
      });

      return true;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw new Error('Failed to update user');
    }
  }

  async updateUserSkill(data: UpdateSkillDto, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const userSkill = await this.prisma.userSkill.findUnique({
      where: { id: data.id },
    });

    if (!userSkill) {
      throw new NotFoundException(`UserSkill with ID ${data.id} not found`);
    }

    if (data.skillId) {
      const newSkill = await this.prisma.skill.findUnique({
        where: { id: data.skillId },
      });

      if (!newSkill) {
        throw new NotFoundException(`Skill with ID ${data.skillId} not found`);
      }
    }

    const updatedUserSkill = await this.prisma.userSkill.update({
      where: { id: data.id },
      data: {
        skillId: data.skillId,
        experience: data.experience,
        description: data?.description,
      },
    });

    return updatedUserSkill;
  }

  async addUserSkill(data: AddUserSkillDto, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const skill = await this.prisma.skill.findUnique({
      where: { id: data.skillId },
    });

    if (!skill) {
      throw new NotFoundException(`Skill with ID ${data.skillId} not found`);
    }

    const existingUserSkill = await this.prisma.userSkill.findFirst({
      where: {
        userId,
        skillId: data.skillId,
      },
    });

    if (existingUserSkill) {
      throw new ConflictException(
        `User already has skill with ID ${data.skillId}`,
      );
    }

    const newUserSkill = await this.prisma.userSkill.create({
      data: {
        userId,
        skillId: data.skillId,
        experience: data.experience,
        description: data.description,
      },
    });

    return newUserSkill;
  }

  async deleteUserSkill(userSkillId: number) {
    const userSkill = await this.prisma.userSkill.findUnique({
      where: { id: userSkillId },
    });

    if (!userSkill) {
      throw new NotFoundException(`UserSkill with ID ${userSkillId} not found`);
    }

    await this.prisma.userSkill.delete({
      where: { id: userSkillId },
    });

    return { message: 'UserSkill deleted successfully' };
  }

  async createInSearchBand(dto: CreateInSearchBandDto, userId: string) {
    return this.prisma.inSearchBand.create({
      data: {
        userId,
        skillId: dto.skill,
        description: dto.description,
        styles: {
          connect: dto.styles.map((styleId) => ({ id: styleId })),
        },
      },
      include: {
        skill: true,
        styles: true,
      },
    });
  }

  async updateInSearchBand(userId: string, dto: UpdateInSearchBandDto) {
    const inSearchBand = await this.prisma.inSearchBand.findUnique({
      where: { userId },
    });

    if (!inSearchBand) {
      throw new NotFoundException('Запись не найдена');
    }

    return this.prisma.inSearchBand.update({
      where: { userId },
      data: {
        skillId: dto.skill,
        description: dto.description,
        styles: {
          set: [],
          connect: dto?.styles?.map((styleId) => ({ id: styleId })),
        },
      },
      include: {
        skill: true,
        styles: true,
      },
    });
  }

  async deleteInSearchBand(id: number) {
    const inSearchBand = await this.prisma.inSearchBand.findUnique({
      where: { id },
    });

    if (!inSearchBand) {
      throw new NotFoundException('Запись не найдена');
    }

    return this.prisma.inSearchBand.delete({
      where: { id },
    });
  }

  async addInSearchMusician(dto: CreateInSearchMusicianDto, userId: string) {
    return this.prisma.inSearchMusician.create({
      data: {
        userId,
        skillId: dto.skill,
        experience: dto.experience,
        description: dto.description,
        styles: {
          connect: dto?.styles?.map((styleId) => ({ id: styleId })),
        },
      },
      include: {
        skill: true,
        styles: true,
      },
    });
  }

  async updateInSearchMusician(dto: UpdateInSearchMusicianDto) {
    const inSearchMusician = await this.prisma.inSearchMusician.findUnique({
      where: { id: dto.id },
    });

    if (!inSearchMusician) {
      throw new NotFoundException('Запись не найдена');
    }

    return this.prisma.inSearchMusician.update({
      where: { id: dto.id },
      data: {
        skillId: dto.skill,
        description: dto.description,
        experience: dto.experience,
        styles: {
          set: [],
          connect: dto?.styles?.map((styleId) => ({ id: styleId })),
        },
      },
      include: {
        skill: true,
        styles: true,
      },
    });
  }

  async deleteInSearchMusician(id: number) {
    const inSearchMusician = await this.prisma.inSearchMusician.findUnique({
      where: { id },
    });

    if (!inSearchMusician) {
      throw new NotFoundException('Запись не найдена');
    }

    return this.prisma.inSearchMusician.delete({
      where: { id },
    });
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
