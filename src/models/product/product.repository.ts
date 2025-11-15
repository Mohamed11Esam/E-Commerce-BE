
import { Model } from "mongoose";
import { AbstractRepository } from "../abstract.repository";

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./product.schema";

@Injectable()
export class productRepository extends AbstractRepository<Product> {
    constructor(@InjectModel(Product.name) productModel :Model<Product> ) {
        super(productModel);
    }
}