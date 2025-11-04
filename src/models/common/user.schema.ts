import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true ,discriminatorKey:'role',toJSON:{virtuals:true},toObject:{virtuals:true}})
export class User{
    readonly _id:Types.ObjectId;
    @Prop({type:String,required:true})
    userName:string;
    @Prop({type:String,required:true})
    password:string;
    @Prop({type:String,required:true,unique:true})
    email:string;
}

export const UserSchema = SchemaFactory.createForClass(User);