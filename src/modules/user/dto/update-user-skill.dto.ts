import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSkillDto {
  @ApiProperty({
    description: 'ID блока навыка',
    example: 1,
  })
  @IsNumber({}, { message: 'skillId must be a number' })
  id: number;

  @ApiProperty({
    description: 'ID навыка',
    example: 1,
  })
  @IsNumber({}, { message: 'skillId must be a number' })
  skillId: number;

  @ApiPropertyOptional({
    description: 'Опыт в годах',
    example: 3,
  })
  @IsOptional()
  @IsNumber({}, { message: 'experience must be a number' })
  experience: number;

  @ApiPropertyOptional({
    description: 'Описание навыка',
    example: 'Описание навыка',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
