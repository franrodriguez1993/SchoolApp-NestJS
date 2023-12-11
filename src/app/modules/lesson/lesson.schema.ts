import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class Lesson {
  @Prop({ require: true })
  @ApiProperty()
  title: string;

  @Prop({ require: true, unique: true })
  @ApiProperty()
  slug: string;

  @Prop({ require: false })
  @ApiProperty()
  video: string;

  @Prop({ require: false })
  @ApiProperty()
  documentation: string[];

  @Prop({ require: true })
  @ApiProperty()
  content: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
