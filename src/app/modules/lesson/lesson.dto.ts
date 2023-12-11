import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Lesson title' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Lesson slug' })
  slug: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Lesson optional video (Youtube link)' })
  video: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ description: 'Lesson optional documentation (Array links)' })
  documentation: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Lesson content' })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'lesson unit id' })
  unitId: string;
}

export class UpdateLessonDto extends PartialType(
  OmitType(CreateLessonDto, ['unitId']),
) {}
