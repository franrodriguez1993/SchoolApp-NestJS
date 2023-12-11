import { Lesson } from '@modules/lesson/lesson.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaTypes } from 'mongoose';

export type UnitDocument = Unit & Document;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class Unit {
  @Prop({ required: true })
  @ApiProperty()
  title: string;

  @ApiProperty({ isArray: true })
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Lesson' }], default: [] })
  lessons: Lesson[];
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
