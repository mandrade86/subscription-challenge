import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Product, ProductModel } from './entity/product.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductResponseDto } from './dto/product-response.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductModel>
  ) {}

  async save(dto: CreateProductDto): Promise<{ _id: string }> {
   try {
     const createdProduct = await this.productModel.create(dto);
    return { _id: createdProduct._id.toHexString() };
   } catch (e){
    console.log('log to sentry or similar', e)
    throw new InternalServerErrorException('Unable to create the product');
   }
  }

  async getAll(): Promise<ProductResponseDto[]> {
    const products = await this.productModel.find();
    return products.map(({ _id, name, available }) => ({
      _id: _id.toHexString(),
      name,
      available,
    }));
  }
}
