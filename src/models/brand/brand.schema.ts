import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Brand extends Document {
  @Prop({ required: true, type: String, unique: true, trim: true })
  name: string;

  @Prop({ required: true, type: String, unique: true, trim: true })
  slug: string;

  @Prop({ type: Object })
  logo: Object;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Admin' })
  createdBy: Types.ObjectId;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
