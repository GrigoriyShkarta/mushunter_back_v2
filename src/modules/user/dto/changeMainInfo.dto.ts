import {
  IsString,
  IsOptional,
  IsArray,
  IsDate,
  IsNumber,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeMainInfoDto {
  @ApiProperty({
    example: 'John',
    description: 'Имя пользователя',
    required: true,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Фамилия пользователя',
    required: true,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Дата рождения пользователя',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  age?: Date;

  @ApiProperty({
    example: ['https://example.com'],
    description: 'Ссылки пользователя',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  links?: string[];

  @ApiProperty({
    example: '+1234567890',
    description: 'Телефон пользователя',
    required: false,
  })
  @IsOptional()
  @IsString()
  telephone?: string;

  @ApiProperty({
    example: 'Описание пользователя',
    description: 'Описание пользователя',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: [1, 2],
    description: 'Стили пользователя',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  styles?: number[];

  @ApiProperty({ example: 1, description: 'ID города', required: false })
  @IsOptional()
  @IsNumber()
  city?: number;
}
