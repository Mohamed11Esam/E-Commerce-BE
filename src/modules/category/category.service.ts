import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryRepository } from '@models/index';
import { Types } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(category: Category) {
    const categoryExist = await this.categoryRepository.findOne(
      { slug: category.slug },
      {},
      {},
    );
    if (categoryExist) {
      throw new ConflictException('Category already exists');
    }
    return await this.categoryRepository.create(category);
  }

  findAll() {
    return this.categoryRepository.find({}, {}, {});
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid category id');
    }
    const category = await this.categoryRepository.findOne(
      { _id: new Types.ObjectId(id) },
      {},
      {},
    );
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid category id');
    }

    const existing = await this.categoryRepository.findOne(
      { _id: new Types.ObjectId(id) },
      {},
      {},
    );
    if (!existing) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.update(
      { _id: new Types.ObjectId(id) },
      updateCategoryDto,
      {},
    );

    const updated = await this.categoryRepository.findOne(
      { _id: new Types.ObjectId(id) },
      {},
      {},
    );
    return updated;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid category id');
    }
    const existing = await this.categoryRepository.findOne(
      { _id: new Types.ObjectId(id) },
      {},
      {},
    );
    if (!existing) {
      throw new NotFoundException('Category not found');
    }
    await this.categoryRepository.delete({ _id: new Types.ObjectId(id) });
    return { success: true, message: 'Category removed successfully' };
  }
}
