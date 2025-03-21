import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStyles() {
    return await this.prisma.style.findMany();
  }

  async getCities() {
    return await this.prisma.city.findMany();
  }

  async getSkills() {
    return await this.prisma.skill.findMany();
  }
}
