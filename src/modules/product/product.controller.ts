import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth, User } from '@common/decorators';
import { ProductFactory } from './factory';
import { MessageConstant } from '@common/constant';

@Controller('product')
@Auth(['Admin', 'Seller'])
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productFactory: ProductFactory,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @User() user: any) {
    const product = this.productFactory.createProduct(createProductDto, user);
    const createdProduct = await this.productService.create(product);
    return {
      success: true,
      message: MessageConstant.Product.createdSuccess,
      data: createdProduct,
    };
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    return {
      success: true,
      message: 'Product fetched successfully',
      data: product,
    };
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updated = await this.productService.update(id, updateProductDto);
    return {
      success: true,
      message: MessageConstant.Product.updatedSuccess,
      data: updated,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.productService.remove(id);
    return res;
  }
}
