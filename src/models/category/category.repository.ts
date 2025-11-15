import { AbstractRepository } from "@models/abstract.repository";
import { Injectable } from "@nestjs/common";
import { Category } from "./category.schema";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
@Injectable()
export class CategoryRepository extends AbstractRepository<Category> {
    constructor(@InjectModel(Category.name) categoryModel: Model<Category>) {
        super(categoryModel);
    }
}