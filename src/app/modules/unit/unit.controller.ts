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
import { UnitService } from './unit.service';
import { CreateUnitDto, UpdateUnitDto } from './unit.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthSecurityRole } from '@shared/decorator/authSecurityRole.decorator';
import { UserRoles } from '@shared/enum/userRoles.enum';

@ApiTags('Unit')
@ApiBearerAuth('access-token')
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @AuthSecurityRole(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Create new unit' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUnitDto: CreateUnitDto) {
    const unit = await this.unitService.create(createUnitDto);
    return { statusCode: HttpStatus.CREATED, result: { unit } };
  }

  @Get()
  @ApiOperation({ summary: 'List all units' })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const units = await this.unitService.findAll();
    return { statusCode: HttpStatus.OK, result: { units } };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get unit by id' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const unit = await this.unitService.findOne(id);
    return { statusCode: HttpStatus.OK, result: { unit } };
  }

  @Put(':id')
  @AuthSecurityRole(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Update unit by id' })
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    const unit = await this.unitService.update(id, updateUnitDto);
    return { statusCode: HttpStatus.OK, result: { unit } };
  }

  @Delete(':unitId/:courseId')
  @AuthSecurityRole(UserRoles.ADMIN)
  @ApiOperation({ summary: 'delete unit' })
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('courseId') courseId: string,
    @Param('unitId') unitId: string,
  ) {
    await this.unitService.remove(unitId, courseId);
    return { statusCode: HttpStatus.OK, result: null };
  }
}
