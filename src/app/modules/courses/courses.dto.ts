import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCourseDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Course title' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Course slug' })
  slug: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: 'Array of course slugs' })
  tags: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Course description' })
  description: string;

  @IsOptional()
  @ApiProperty({ description: 'Course image' })
  image: string;
}

export class UpdateCourseDTO extends PartialType(
  OmitType(CreateCourseDTO, ['slug']),
) {}

export class TeacherCourseDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Teacher id' })
  teacherId: string;
}
