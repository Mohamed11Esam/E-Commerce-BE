import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true, type: String, unique: true, trim: true })
  name: string;

  @Prop({ required: true, type: String, unique: true, trim: true })
  slug: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Admin', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Object })
  logo: Object;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
