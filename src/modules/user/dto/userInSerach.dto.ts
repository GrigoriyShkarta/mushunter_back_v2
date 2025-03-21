import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  IsArray,
  Min,
  IsNumber,
} from 'class-validator';

export class CreateInSearchBandDto {
  @ApiProperty({
    example: 1,
    description: 'ID навыка пользователя',
  })
  @IsInt()
  skill: number;

  @ApiPropertyOptional({
    example: 'Ищу рок-группу',
    description: 'Описание поиска группы',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    example: [2, 3],
    description: 'Массив ID стилей',
    type: [Number],
  })
  @IsArray()
  @IsInt({ each: true })
  styles: number[];
}

export class UpdateInSearchBandDto {
  @ApiPropertyOptional({
    example: 2,
    description: 'Новый ID навыка',
    required: true,
  })
  @IsInt()
  @IsOptional()
  skill?: number;

  @ApiPropertyOptional({
    example: 'Хочу играть джаз',
    description: 'Новое описание поиска',
  })
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: [4, 5],
    description: 'Обновленный список стилей',
    type: [Number],
  })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  styles?: number[];
}

export class CreateInSearchMusicianDto {
  @ApiProperty({
    example: 1,
    description: 'ID навыка (skillId)',
    required: true,
  })
  @IsInt()
  skill: number;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  styles?: number[];

  @ApiProperty({ example: 5, description: 'Опыт (в годах)' })
  @IsInt()
  @Min(0)
  experience: number;

  @ApiProperty({
    example: 'Ищу группу в стиле рок',
    description: 'Описание',
    required: false,
  })
  @IsString()
  description?: string;
}

export class UpdateInSearchMusicianDto {
  @ApiProperty({
    description: 'ID блока навыка',
    example: 1,
  })
  @IsNumber({}, { message: 'skillId must be a number' })
  id: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'ID навыка',
    required: true,
  })
  @IsInt()
  @IsOptional()
  skill?: number;

  @ApiPropertyOptional({
    example: 'Хочу играть джаз',
    description: 'Новое описание поиска',
  })
  @IsString()
  description?: string;

  @ApiProperty({ example: 5, description: 'Опыт (в годах)' })
  @IsInt()
  @Min(0)
  experience: number;

  @ApiPropertyOptional({
    example: [4, 5],
    description: 'Обновленный список стилей',
    type: [Number],
  })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  styles?: number[];
}
