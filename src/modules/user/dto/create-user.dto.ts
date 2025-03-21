import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'ID from firebase', required: true })
  @IsString()
  id: string;

  @ApiProperty({ example: 'John', required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'johndoe@gmail.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'smthURL' })
  @IsString()
  @IsOptional()
  avatarUrl: string;
}
