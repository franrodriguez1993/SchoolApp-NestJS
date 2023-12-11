import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDate,
  IsEmail,
  IsEnum,
} from 'class-validator';

export enum UserRoles {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'First Name' })
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Last Name' })
  lastName: string;

  @IsEmail()
  @ApiProperty({ description: 'User email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User password' })
  password: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: 'User birthdate' })
  birthDate: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Brief user bio' })
  bio: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'user portfolio url' })
  portfolio: string;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email']),
) {}

export class UpdateUserRoleDto {
  @IsEnum(UserRoles, { message: 'Invalid role' })
  @ApiProperty({ description: 'user role: STUDENT, TEACHER, ADMIN' })
  role: UserRoles;
}

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({ description: 'User email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User password' })
  password: string;
}
