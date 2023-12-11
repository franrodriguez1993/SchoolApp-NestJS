import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
  UpdateUserRoleDto,
} from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { CoursesService } from '@modules/courses/courses.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class UserService implements OnModuleInit {
  private courseService: CoursesService;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.courseService = this.moduleRef.get(CoursesService, { strict: false });
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 8);
    const newUser = await this.userModel.create(createUserDto);
    newUser.password = null;
    return newUser;
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ user: User; token: string }> {
    const user = await this.userModel
      .findOne({ email: loginUserDto.email })
      .select('+password');
    if (!user) throw new BadRequestException('Invalid credentials');

    if (!bcrypt.compare(loginUserDto.password, user.password))
      throw new BadRequestException('Invalid credentials');
    user.password = null;

    const payload = { id: user._id, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { user, token };
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async updateData(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, {
      new: true,
    });
  }

  async updateRole(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    return await this.userModel.findByIdAndUpdate(
      { _id: id },
      { role: updateUserRoleDto.role },
      { new: true },
    );
  }

  async addCourse(userId: string, courseId: string) {
    const user = await this.userModel.updateOne(
      { _id: userId },
      { $addToSet: { courses: courseId } },
    );
    await this.courseService.addStudent(courseId, userId);
    return user;
  }
}
