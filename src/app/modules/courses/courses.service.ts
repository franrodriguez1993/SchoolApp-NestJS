import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import {
  CreateCourseDTO,
  TeacherCourseDTO,
  UpdateCourseDTO,
} from './courses.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './courses.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from '@modules/user/user.schema';
import { UserRoles } from '@modules/user/user.dto';
import { UnitService } from '@modules/unit/unit.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class CoursesService implements OnModuleInit {
  private unitService: UnitService;

  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.unitService = this.moduleRef.get(UnitService, { strict: false });
  }

  async create(createCourseDto: CreateCourseDTO): Promise<Course> {
    return await this.courseModel.create(createCourseDto);
  }

  async findAll(): Promise<Course[]> {
    return await this.courseModel.find();
  }

  async findOne(id: string): Promise<Course> {
    return await this.courseModel
      .findById(id)
      .populate([
        { path: 'teacher' },
        { path: 'units', populate: { path: 'lessons', model: 'Lesson' } },
      ])
      .exec();
  }

  async updateCourseData(
    id: string,
    updateCourseDto: UpdateCourseDTO,
  ): Promise<Course> {
    return await this.courseModel.findByIdAndUpdate(id, updateCourseDto);
  }

  async remove(id: string) {
    const course = await this.courseModel.findById(id);
    if (!course) throw new NotFoundException();

    for (let i = 0; i < course.units.length; i++) {
      await this.unitService.removeCascade(course.units[i].toString());
    }
    return await this.courseModel.deleteOne({ _id: id });
  }

  async addTeacherToCourse(
    id: string,
    teacherCourseDTO: TeacherCourseDTO,
  ): Promise<Course> {
    const teacher = await this.userModel.findById(teacherCourseDTO.teacherId);
    if (!teacher) throw new NotFoundException();
    if (teacher.role !== UserRoles.TEACHER)
      throw new BadRequestException('Invalid user role');
    return await this.courseModel.findByIdAndUpdate(id, { teacher });
  }

  async addUnit(id: string, unitId: string) {
    await this.courseModel.updateOne(
      { _id: id },
      { $addToSet: { units: unitId } },
    );
  }

  async deleteUnit(id: string, unitId: string) {
    await this.courseModel.updateOne(
      { _id: id },
      { $pull: { units: { unitId } } },
    );
  }

  async addStudent(courseId: string, studentId: string) {
    await this.courseModel.updateOne(
      { _id: courseId },
      { $addToSet: { students: studentId } },
    );
  }
}
