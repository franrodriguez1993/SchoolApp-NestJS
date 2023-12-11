import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUnitDto, UpdateUnitDto } from './unit.dto';
import { CoursesService } from '@modules/courses/courses.service';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Unit, UnitDocument } from './unit.schema';
import { Model } from 'mongoose';
import { LessonService } from '@modules/lesson/lesson.service';

@Injectable()
export class UnitService implements OnModuleInit {
  private coursesService: CoursesService;
  private lessonService: LessonService;
  constructor(
    @InjectModel(Unit.name)
    private readonly unitModel: Model<UnitDocument>,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.coursesService = this.moduleRef.get(CoursesService, { strict: false });
    this.lessonService = this.moduleRef.get(LessonService, { strict: false });
  }

  async create(createUnitDto: CreateUnitDto): Promise<Unit> {
    const unit = await this.unitModel.create(createUnitDto);
    await this.coursesService.addUnit(createUnitDto.courseId, unit.id);
    return unit;
  }

  async findAll(): Promise<Unit[]> {
    return await this.unitModel.find();
  }

  async findOne(id: string): Promise<Unit> {
    return await this.unitModel.findById(id).populate('lessons');
  }

  async update(id: string, updateUnitDto: UpdateUnitDto): Promise<Unit> {
    return await this.unitModel.findByIdAndUpdate(id, updateUnitDto, {
      new: true,
    });
  }

  async remove(unitId: string, courseId: string) {
    this.coursesService.deleteUnit(courseId, unitId);
    return await this.unitModel.deleteOne({ _id: unitId });
  }

  async addLesson(unitId: string, lessonId: string) {
    await this.unitModel.updateOne(
      { _id: unitId },
      { $addToSet: { lessons: lessonId } },
    );
  }

  async deleteLesson(unitId: string, lessonId: string) {
    await this.unitModel.updateOne(
      { _id: unitId },
      { $pull: { lessons: lessonId } },
    );
  }

  async removeCascade(unitId: string) {
    const unit = await this.unitModel.findById(unitId);
    if (!unit) throw new NotFoundException();
    for (let i = 0; i < unit.lessons.length; i++) {
      await this.lessonService.removeCascade(unit.lessons[i].toString());
    }
    return await this.unitModel.deleteOne({ _id: unitId });
  }
}
