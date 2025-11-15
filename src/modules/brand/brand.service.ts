import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandRepository } from '@models/index';
import { Types } from 'mongoose';
import slugify from 'slugify';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async create(createBrand: Brand) {
    const name = (createBrand as any).name;
    if (!name) {
      throw new BadRequestException('Brand name is required');
    }
    const slug = slugify(name, { lower: true, replacement: '-', trim: true });
    const exists = await this.brandRepository.findOne({ slug }, {}, {});
    if (exists) {
      throw new ConflictException('Brand already exists');
    }
    const payload: any = { name, slug, logo: (createBrand as any).logo, createdBy: (createBrand as any).createdBy };
    return this.brandRepository.create(payload);
  }

  async findAll() {
    return await this.brandRepository.find({}, {}, {});
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
    const brand = await this.brandRepository.findOne({ _id: new Types.ObjectId(id) }, {}, {});
    if (!brand) throw new NotFoundException('Brand not found');
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
    const existing = await this.brandRepository.findOne({ _id: new Types.ObjectId(id) }, {}, {});
    if (!existing) throw new NotFoundException('Brand not found');
    await this.brandRepository.update({ _id: new Types.ObjectId(id) }, updateBrandDto, {});
    return this.brandRepository.findOne({ _id: new Types.ObjectId(id) }, {}, {});
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
    const existing = await this.brandRepository.findOne({ _id: new Types.ObjectId(id) }, {}, {});
    if (!existing) throw new NotFoundException('Brand not found');
    await this.brandRepository.delete({ _id: new Types.ObjectId(id) });
    return { success: true, message: 'Brand removed successfully' };
  }
}
