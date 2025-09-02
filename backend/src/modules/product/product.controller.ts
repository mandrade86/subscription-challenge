import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResponseDto } from './dto/product-response.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '@/guards/auth-guard';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async getAll(): Promise<ProductResponseDto[]> {
    return this.productService.getAll();
  }

  @Post('/')
  async save(@Body() dto: CreateProductDto): Promise<{ _id: string }> {
    return this.productService.save(dto);
  }
}
