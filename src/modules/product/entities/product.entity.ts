
import { DiscountType } from "@models/product/product.schema";
import { Types } from "mongoose";

export class Product {
    readonly _id: Types.ObjectId;
    
        name : string;
        slug : string;
        description : string;
    
        categoryId : Types.ObjectId;
        brandId : Types.ObjectId;
        createdBy : Types.ObjectId;
        updatedBy : Types.ObjectId;
    
        price : number;
        stock : number;
        discount : number;
        discountType : DiscountType;
        sold : number;
        finalPrice : number;
    
        colors : string[];
        sizes : string[];
        images : string[];
}
