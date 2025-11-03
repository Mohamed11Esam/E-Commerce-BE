
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true ,discriminatorKey:'role',toJSON:{virtuals:true},toObject:{virtuals:true}})
export class Seller{
    userName:string;
    password:string;
    email:string;
    @Prop({type:String,required:true})
    whatsappNumber:string;
}

export const sellerSchema = SchemaFactory.createForClass(Seller);