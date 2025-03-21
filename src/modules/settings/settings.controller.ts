import { Controller, Get } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('styles')
  async getStyles() {
    return await this.settingsService.getStyles();
  }

  @Get('cities')
  async getCities() {
    return await this.settingsService.getCities();
  }

  @Get('skills')
  async getSkills() {
    return await this.settingsService.getSkills();
  }
}
