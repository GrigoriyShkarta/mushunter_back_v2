import {
  Body,
  Controller,
  Get,
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
  @Put('mainInfo')
  changeMainInfo(@Body() data: ChangeMainInfoDto, @Req() req: Request) {
    const userId = req?.user?.id;
    if (userId) {
      return this.userService.changeMainInfo(data, userId);
    }
  }
}
