import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto, UpdateLessonDto } from './lesson.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthSecurityRole } from '@shared/decorator/authSecurityRole.decorator';
import { UserRoles } from '@shared/enum/userRoles.enum';

@ApiTags('Lesson')
@ApiBearerAuth('access-token')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @AuthSecurityRole(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Create new lesson' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLessonDto: CreateLessonDto) {
    const lesson = await this.lessonService.create(createLessonDto);
    return { statusCode: HttpStatus.CREATED, result: { lesson } };
  }

  @Get()
  @ApiOperation({ summary: 'List all lessons' })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const lessons = await this.lessonService.findAll();
    return { statusCode: HttpStatus.OK, result: { lessons } };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lesson by id' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const lesson = await this.lessonService.findOne(id);
    return { statusCode: HttpStatus.OK, result: { lesson } };
  }

  @Put(':id')
  @AuthSecurityRole(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Update lesson by id' })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    const lesson = await this.lessonService.update(id, updateLessonDto);
    return { statusCode: HttpStatus.OK, result: { lesson } };
  }

  @Delete(':lessonId/:unitId')
  @AuthSecurityRole(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Delete lesson' })
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('lessonId') lessonId: string,
    @Param('unitId') unitId: string,
  ) {
    await this.lessonService.remove(lessonId, unitId);
    return { statusCode: HttpStatus.OK, result: null };
  }
}
