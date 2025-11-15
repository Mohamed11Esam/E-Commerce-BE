import { Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

export enum DiscountType {
    PERCENTAGE = 'percentage',
    FIXED = 'fixed'
}

@Schema({ timestamps: true })
export class Product {
    readonly _id: Types.ObjectId;

    @Prop({ required: true , type: String,trim: true })
    name : string;
    @Prop({ required: true , type: String,trim: true })
    slug : string;
    @Prop({ required: true , type: String,trim: true })
    description : string;

   @Prop({type: SchemaTypes.ObjectId, ref: 'Category', required: true })   
    categoryId : Types.ObjectId;
    @Prop({type: SchemaTypes.ObjectId, ref: 'Brand', required: true })    
    brandId : Types.ObjectId;
    @Prop({ required: true , type: SchemaTypes.ObjectId , ref: 'User' })
    createdBy : Types.ObjectId;
    @Prop({ required: true , type: SchemaTypes.ObjectId , ref: 'User' })
    updatedBy : Types.ObjectId;

    @Prop({ required: true , type: Number , min: 1 })
    price : number;
    @Prop({ required: true , type: Number , min: 0 })
    stock : number;
    @Prop({ type: Number , min: 0 })
    discount : number;
    @Prop({ type: String , enum: DiscountType , default: DiscountType.FIXED })
    discountType : DiscountType;
    @Prop({ type: Number , default: 0 , min: 0 })
    sold : number;
    @Virtual({
        get: function (this: Product) {
            // if discount is provided and > 0, apply it; otherwise return base price
            if (this.discount && this.discount > 0) {
                if (this.discountType === DiscountType.PERCENTAGE) {
                    return this.price - (this.price * this.discount / 100);
                } else if (this.discountType === DiscountType.FIXED) {
                    return this.price - this.discount;
                }
            }

            // default to base price when no discount
            return this.price;
        }
    })
    finalPrice : number;

    @Prop({ type: [String] })
    colors : string[];
    @Prop({ type: [String] })
    sizes : string[];
    @Prop({ type: [String] })
    images : string[];

}

export const ProductSchema = SchemaFactory.createForClass(Product);

// include virtuals when converting documents to JSON / plain objects
ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });