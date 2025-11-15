import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandRepository, BrandSchema, UserRepository } from '@models/index';
import { BrandFactory } from './factory';
import { UserMongoModule } from '@shared/index';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository, BrandFactory,JwtService],
  exports: [BrandService, BrandRepository, BrandFactory],
})
export class BrandModule {}
