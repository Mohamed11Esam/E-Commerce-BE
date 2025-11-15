
import { DiscountType } from '@models/index';
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString,MinLength } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsString()  
  @IsNotEmpty()
  @MinLength(3)
  name: string;
  @IsString()
    @IsNotEmpty()
    @MinLength(10)
  description: string;

  @IsMongoId()
  @IsNotEmpty()
  categoryId: Types.ObjectId;
  @IsMongoId()
  @IsNotEmpty()
  brandId: Types.ObjectId;

    @IsNumber()
    @IsNotEmpty()
  price: number;
  @IsNumber()
    @IsNotEmpty()
  stock: number;
  @IsNumber()
    @IsOptional()
  discount: number;
   @IsString()
    @IsOptional() 
    @IsEnum(DiscountType)
  discountType: DiscountType;

    @IsOptional()
   @IsString({ each: true })
  colors: string[];
  @IsString({ each: true })
    @IsOptional()
  sizes: string[];
  @IsString({ each: true })
    @IsOptional()
  images: string[];
}
