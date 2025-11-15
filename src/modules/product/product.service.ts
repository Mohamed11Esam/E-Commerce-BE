import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { productRepository } from './../../models/product/product.repository';
import { Product } from './entities/product.entity';
import { CategoryService } from './../category/category.service';
import { BrandService } from '@modules/brand/brand.service';
import { MessageConstant } from '@common/constant';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: productRepository,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
  ) {}
  async create(product: Product) {
    //check if brand exists and category exists
    await this.brandService.findOne((product as any).brandId);
    await this.categoryService.findOne((product as any).categoryId);
    return await this.productRepository.create(product);
  }
  async findAll() {
    return await this.productRepository.find({}, {}, {});
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid product id');
    const product = await this.productRepository.findOne(
      { _id: new Types.ObjectId(id) },
      {},
      {},
    );
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid product id');
    const existing = await this.productRepository.findOne(
      { _id: new Types.ObjectId(id) },
      {},
      {},
    );
    if (!existing) throw new NotFoundException('Product not found');
    await this.productRepository.update(
      { _id: new Types.ObjectId(id) },
      updateProductDto,
      {},
    );
    return await this.productRepository.findOne(
      { _id: new Types.ObjectId(id) },
      {},
      {},
    );
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid product id');
    const existing = await this.productRepository.findOne(
      { _id: new Types.ObjectId(id) },
      {},
      {},
    );
    if (!existing) throw new NotFoundException('Product not found');
    await this.productRepository.delete({ _id: new Types.ObjectId(id) });
    return { success: true, message: MessageConstant.Product.deletedSuccess };
  }
}
