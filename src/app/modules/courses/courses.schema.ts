import { Unit } from '@modules/unit/unit.schema';
import { User } from '@modules/user/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaTypes } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class Course {
  @Prop({ require: true, unique: true })
  @ApiProperty()
  title: string;

  @Prop({ require: true, unique: true })
  @ApiProperty()
  slug: string;

  @Prop({ require: false })
  @ApiProperty()
  tags: string[];

  @Prop({ require: true })
  @ApiProperty()
  description: string;

  @Prop({
    require: false,
    type: SchemaTypes.ObjectId,
    ref: 'User',
    default: null,
  })
  @ApiProperty()
  teacher: User;

  @Prop({
    require: false,
    type: [{ type: SchemaTypes.ObjectId, ref: 'Unit' }],
    default: [],
  })
  @ApiProperty({ isArray: true })
  units: Unit[];

  @Prop({
    require: false,
    type: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
    default: [],
  })
  students: User[];

  @Prop({ require: false })
  @ApiProperty()
  image: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
