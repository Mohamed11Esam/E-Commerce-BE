import slugify from "slugify";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { Category } from "../entities/category.entity";
import { Injectable } from "@nestjs/common";


@Injectable()
export class CategoryFactory {
    createCategory(createCategoryDto: CreateCategoryDto , user : any) {
        const category =new Category(); 
        category.name = createCategoryDto.name;
        category.slug = slugify(createCategoryDto.name, { lower: true ,replacement:'-',trim:true});
        category.logo = createCategoryDto.logo;
        category.createdBy = user._id;
        return category;
    }
}