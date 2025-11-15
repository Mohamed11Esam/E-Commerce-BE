import slugify from 'slugify';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Brand } from '../entities/brand.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BrandFactory {
  createBrand(createBrandDto: CreateBrandDto, user: any) {
    const brand = new Brand();
    brand.name = (createBrandDto as any).name;
    brand.slug = slugify((createBrandDto as any).name, { lower: true, replacement: '-', trim: true });
    brand.logo = (createBrandDto as any).logo;
    brand.createdBy = user?._id;
    return brand;
  }
}
