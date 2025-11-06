
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Admin } from "../admin/admin.schema";
import { Types } from "mongoose";

@Schema({ timestamps: true ,discriminatorKey:'role',toJSON:{virtuals:true},toObject:{virtuals:true}})
export class Customer{
    readonly _id:Types.ObjectId;
    userName:string;
    password:string;
    email:string;
    otp:string;
    otpExpiration:Date;
    isVerified:boolean;
    @Prop({type:Date})
    dob:Date; 
}

export const customerSchema = SchemaFactory.createForClass(Customer);