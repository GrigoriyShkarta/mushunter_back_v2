import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './response';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('USER')
  @ApiResponse({ status: 200, type: UserResponse })
  @Post('create')
  async create(@Body() data: CreateUserDto): Promise<UserResponse> {
    return this.userService.create(data);
  }

  @Post('google-auth')
  findOne(@Body() data: CreateUserDto): Promise<boolean> {
    return this.userService.googleAuth(data);
  }
}
