import slugify from "slugify";
import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../entities/product.entity";
import { Types } from "mongoose";

export class ProductFactory {
    // Factory methods to create Product instances can be added here
    createProduct(createProductDto : CreateProductDto , user : any) {
        const product = new Product();
        product.name = createProductDto.name;
        product.slug = slugify(createProductDto.name, { lower: true, replacement: '-', trim: true });
        product.description = createProductDto.description;
        product.price = createProductDto.price;
        product.discount = createProductDto.discount;
        product.discountType = createProductDto.discountType;
        product.categoryId = new Types.ObjectId(createProductDto.categoryId);
        product.brandId = new Types.ObjectId(createProductDto.brandId);
        product.createdBy = user?._id;
        product.updatedBy = user?._id;
        product.stock = createProductDto.stock;
        product.colors = createProductDto.colors;
        product.sizes = createProductDto.sizes;
        product.images = createProductDto.images;
        product.sold = 0;
        return product;
    }
}