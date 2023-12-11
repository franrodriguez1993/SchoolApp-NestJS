import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO, TeacherCourseDTO } from './courses.dto';
import { UpdateCourseDTO } from './courses.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Course')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Create new course' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCourseDto: CreateCourseDTO) {
    const course = await this.coursesService.create(createCourseDto);
    return { statusCode: HttpStatus.CREATED, result: { data: course } };
  }

  @Get()
  @ApiOperation({ summary: 'List all courses' })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const courses = await this.coursesService.findAll();
    return { statusCode: HttpStatus.OK, result: { data: courses } };
  }

  @Get(':id')
  @ApiOperation({ summary: 'List one course by id' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const course = await this.coursesService.findOne(id);
    return { statusCode: HttpStatus.OK, result: { data: course } };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update course data' })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDTO,
  ) {
    const course = await this.coursesService.updateCourseData(
      id,
      updateCourseDto,
    );
    return { statusCode: HttpStatus.OK, result: { data: course } };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete course' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.coursesService.remove(id);
    return { statusCode: HttpStatus.OK, result: { data: null } };
  }

  @Put(':id/teacher')
  @ApiOperation({ summary: 'Add new teacher to course' })
  @HttpCode(HttpStatus.OK)
  async addTeacher(
    @Param('id') id: string,
    @Body() teacherCourseDTO: TeacherCourseDTO,
  ) {
    const course = await this.coursesService.addTeacherToCourse(
      id,
      teacherCourseDTO,
    );
    return { statusCode: HttpStatus.OK, result: { data: course } };
  }
}
