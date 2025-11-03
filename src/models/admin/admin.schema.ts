
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true ,discriminatorKey:'role',toJSON:{virtuals:true},toObject:{virtuals:true}})
export class Admin{
    userName:string;
    password:string;
    email:string;
}

export const adminSchema = SchemaFactory.createForClass(Admin);