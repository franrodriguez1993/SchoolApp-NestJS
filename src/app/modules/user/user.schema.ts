import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from './user.dto';
import { Course } from '@modules/courses/courses.schema';
import { SchemaTypes } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class User {
  @ApiProperty()
  @ApiProperty()
  @Prop({ required: true })
  firstName: string;

  @ApiProperty()
  @Prop({ required: true })
  lastName: string;

  @ApiProperty()
  @Prop({ required: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true, select: false })
  password: string;

  @ApiProperty()
  @Prop({ required: true })
  birthDate: Date;

  @ApiProperty()
  @Prop()
  bio: string;

  @ApiProperty()
  @Prop({ default: UserRoles.STUDENT })
  role: string;

  @ApiProperty()
  @Prop({ default: true })
  active: boolean;

  @ApiProperty()
  @Prop({})
  portfolio: string;

  @Prop({
    require: false,
    type: [{ type: SchemaTypes.ObjectId, ref: 'Course' }],
    default: [],
  })
  courses: Course[];
}

export const UserSchema = SchemaFactory.createForClass(User);
