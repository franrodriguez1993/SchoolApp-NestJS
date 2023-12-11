import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Unit title' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Course id' })
  courseId: string;
}
export class UpdateUnitDto extends PartialType(
  OmitType(CreateUnitDto, ['courseId']),
) {}
