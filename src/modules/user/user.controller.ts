import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './response';
import { UserService } from './user.service';
import { Request } from 'express';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.quard';
import { ChangeMainInfoDto } from './dto/changeMainInfo.dto';
import { UpdateSkillDto } from './dto/update-user-skill.dto';
import { AddUserSkillDto } from './dto/add-user-skill.dto';
import {
  CreateInSearchBandDto,
  CreateInSearchMusicianDto,
  UpdateInSearchBandDto,
  UpdateInSearchMusicianDto,
} from './dto/userInSerach.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('USER')
  @ApiResponse({ status: 200, type: UserResponse })
  @Post('create')
  async create(@Body() data: CreateUserDto): Promise<UserResponse> {
    return this.userService.create(data);
  }

  @ApiTags('USER')
  @Post('google-auth')
  async findOne(@Body() data: CreateUserDto): Promise<boolean> {
    return this.userService.googleAuth(data);
  }

  @ApiTags('USER')
  @ApiResponse({ status: 200, type: UserResponse })
  @UseGuards(FirebaseAuthGuard)
  @Get()
  getUser(@Req() req: Request) {
    const userId = req?.user?.id;
    if (userId) {
      return this.userService.findById(userId);
    }
  }

  @ApiTags('USER')
  @ApiResponse({ status: 200, type: UserResponse })
  @UseGuards(FirebaseAuthGuard)
  @Put('main-info')
  changeMainInfo(@Body() data: ChangeMainInfoDto, @Req() req: Request) {
    const userId = req?.user?.id;
    if (userId) {
      return this.userService.changeMainInfo(data, userId);
    }
  }

  @ApiTags('USER')
  @ApiResponse({ status: 200, type: UserResponse })
  @UseGuards(FirebaseAuthGuard)
  @Put('skills')
  changeSkills(@Body() data: UpdateSkillDto, @Req() req: Request) {
    const userId = req?.user?.id;
    if (userId) {
      return this.userService.updateUserSkill(data, userId);
    }
  }

  @ApiTags('USER')
  @ApiResponse({ status: 200, type: UserResponse })
  @UseGuards(FirebaseAuthGuard)
  @Post('skills')
  addSkill(@Body() data: AddUserSkillDto, @Req() req: Request) {
    const userId = req?.user?.id;
    if (userId) {
      return this.userService.addUserSkill(data, userId);
    }
  }

  @ApiTags('USER')
  @ApiResponse({ status: 200, type: UserResponse })
  @UseGuards(FirebaseAuthGuard)
  @Delete('skills/:id')
  deleteSkill(@Param('id') id: string, @Req() req: Request) {
    const userId = req?.user?.id;
    if (userId) {
      return this.userService.deleteUserSkill(+id);
    }
  }

  @ApiTags('USER')
  @ApiResponse({ status: 200, type: UserResponse })
  @UseGuards(FirebaseAuthGuard)
  @Post('search-band')
  addedSearchBand(@Body() data: CreateInSearchBandDto, @Req() req: Request) {
    const userId = req?.user?.id;
    if (userId) {
      return this.userService.createInSearchBand(data, userId);
    }
  }

  @ApiTags('USER')
  @ApiResponse({ status: 200, type: UserResponse })
  @UseGuards(FirebaseAuthGuard)
  @Put('search-band')
  updateINsearchBand(@Body() data: UpdateInSearchBandDto, @Req() req: Request) {
    const userId = req?.user?.id;
    if (userId) {
      return this.userService.updateInSearchBand(userId, data);
    }
  }

  @ApiTags('USER')
  @ApiResponse({ status: 200, type: UserResponse })
  @UseGuards(FirebaseAuthGuard)
  @Delete('search-band/:id')
  deleteInSearchBand(@Param('id') id: string, @Req() req: Request) {
    const userId = req?.user?.id;
    if (userId) {
      return this.userService.deleteInSearchBand(+id);
    }
  }

  @ApiTags('USER')
  @ApiResponse({ status: 200, type: UserResponse })
  @UseGuards(FirebaseAuthGuard)
  @Post('search-musician')
  addedSearchMusician(
    @Body() data: CreateInSearchMusicianDto,
    @Req() req: Request,
  ) {
    const userId = req?.user?.id;
    if (userId) {
      return this.userService.addInSearchMusician(data, userId);
    }
  }

  @ApiTags('USER')
  @ApiResponse({ status: 200, type: UserResponse })
  @UseGuards(FirebaseAuthGuard)
  @Put('search-musician')
  updateINsearchMusician(
    @Body() data: UpdateInSearchMusicianDto,
    @Req() req: Request,
  ) {
    const userId = req?.user?.id;
    if (userId) {
      return this.userService.updateInSearchMusician(data);
    }
  }

  @ApiTags('USER')
  @ApiResponse({ status: 200, type: UserResponse })
  @UseGuards(FirebaseAuthGuard)
  @Delete('search-musician/:id')
  deleteInSearchMusician(@Param('id') id: string, @Req() req: Request) {
    const userId = req?.user?.id;
    if (userId) {
      return this.userService.deleteInSearchMusician(+id);
    }
  }
}
