import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Auth, User } from '@common/decorators';
import { BrandFactory } from './factory';

@Controller('brand')
@Auth(['Admin'])
export class BrandController {
  constructor(private readonly brandService: BrandService, private readonly brandFactory: BrandFactory) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto, @User() user: any) {
    const brand = this.brandFactory.createBrand(createBrandDto, user);
    const created = await this.brandService.create(brand as any);
    return { success: true, message: 'Brand created successfully', data: created };
  }

  @Get()
  async findAll() {
    return await this.brandService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.brandService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    const updated = await this.brandService.update(id, updateBrandDto);
    return { success: true, message: 'Brand updated successfully', data: updated };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.brandService.remove(id);
  }
}
