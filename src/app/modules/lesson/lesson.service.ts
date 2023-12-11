import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateLessonDto, UpdateLessonDto } from './lesson.dto';
import { UnitService } from '@modules/unit/unit.service';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson, LessonDocument } from './lesson.schema';
import { Model } from 'mongoose';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class LessonService implements OnModuleInit {
  private unitService: UnitService;

  constructor(
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<LessonDocument>,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.unitService = this.moduleRef.get(UnitService, { strict: false });
  }

  async create(createLessonDto: CreateLessonDto) {
    const lesson = await this.lessonModel.create(createLessonDto);
    await this.unitService.addLesson(createLessonDto.unitId, lesson._id);
    return lesson;
  }

  async findAll() {
    return await this.lessonModel.find();
  }

  async findOne(id: string) {
    return await this.lessonModel.findById(id);
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    return await this.lessonModel.findByIdAndUpdate(id, updateLessonDto, {
      new: true,
    });
  }

  async remove(lessonId: string, unitId: string) {
    await this.unitService.deleteLesson(unitId, lessonId);
    return await this.lessonModel.deleteOne({ _id: lessonId });
  }

  async removeCascade(lessonId: string) {
    await this.lessonModel.deleteOne({ _id: lessonId });
  }
}
