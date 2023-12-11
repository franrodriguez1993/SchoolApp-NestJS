import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
  UpdateUserRoleDto,
} from './user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register new user' })
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.register(createUserDto);
    return { statusCode: HttpStatus.CREATED, result: { data: user } };
  }
  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.login(loginUserDto);
    return { statusCode: HttpStatus.OK, result: { data: user } };
  }

  @Get()
  @ApiOperation({ summary: 'Return a user list' })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const userList = await this.userService.findAll();
    return { statusCode: HttpStatus.OK, result: { data: userList } };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return { statusCode: HttpStatus.OK, result: { data: user } };
  }

  @Put(':id')
  @ApiOperation({ summary: 'update user' })
  @HttpCode(HttpStatus.OK)
  async updateData(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.updateData(id, updateUserDto);
    return { statusCode: HttpStatus.OK, result: { data: user } };
  }

  @Put(':id/role')
  @ApiOperation({ summary: 'update user role' })
  @HttpCode(HttpStatus.OK)
  async updateRole(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    const user = await this.userService.updateRole(id, updateUserRoleDto);
    return { statusCode: HttpStatus.OK, result: { data: user } };
  }

  @Put(':userId/course/:courseId')
  @ApiOperation({ summary: 'Add course to user' })
  @HttpCode(HttpStatus.OK)
  async addCourse(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    const user = await this.userService.addCourse(userId, courseId);
    return { statusCode: HttpStatus.OK, result: { data: user } };
  }
}
