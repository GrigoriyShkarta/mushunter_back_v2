import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsOptional,
  IsArray,
  IsDate,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class StyleResponse {
  @ApiProperty({ example: 1, description: 'ID стиля' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Стиль 1', description: 'Название стиля' })
  @IsString()
  name: string;
}

class CityResponse {
  @ApiProperty({ example: 1, description: 'ID города' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Киев', description: 'Название города' })
  @IsString()
  name: string;
}

export class UserResponse {
  @ApiProperty({ example: 'user-123', description: 'ID пользователя' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'John', description: 'Имя пользователя' })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Фамилия пользователя',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName: string | null;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'Аватар пользователя',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar: string | null;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Дата рождения пользователя',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  age: Date | null;

  @ApiProperty({
    example: ['https://example.com'],
    description: 'Ссылки пользователя',
    required: false,
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  links: string[] | null;

  @ApiProperty({
    example: '+1234567890',
    description: 'Телефон пользователя',
    required: false,
  })
  @IsString()
  @IsOptional()
  telephone: string | null;

  @ApiProperty({
    example: 'Описание пользователя',
    description: 'Описание пользователя',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string | null;

  @ApiProperty({
    example: [{ id: 1, name: 'Стиль 1' }],
    description: 'Стили пользователя',
    required: false,
    type: [StyleResponse],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StyleResponse)
  @IsOptional()
  styles: StyleResponse[] | null;

  @ApiProperty({
    example: { id: 1, name: 'Киев' },
    description: 'Город пользователя',
    required: false,
    type: CityResponse,
  })
  @ValidateNested()
  @Type(() => CityResponse)
  @IsOptional()
  city: CityResponse | null;
}
