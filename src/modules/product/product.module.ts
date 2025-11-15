import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserMongoModule } from '@shared/index';
import { ProductFactory } from './factory';
import { JwtService } from '@nestjs/jwt';
import { Brand, BrandSchema, Product, productRepository, ProductSchema } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '@modules/category/category.module';
import { BrandModule } from '@modules/brand/brand.module';


@Module({
  imports: [
  UserMongoModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
     MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
    CategoryModule,
  BrandModule
  ],
  controllers: [ProductController,],
  providers: [ProductService, ProductFactory,JwtService,productRepository],
})
export class ProductModule {}
