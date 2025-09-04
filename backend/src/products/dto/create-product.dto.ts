import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsArray, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'Premium Subscription' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Product description', example: 'Access to premium features and content' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Product price', example: 29.99, minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Product category', example: 'Software' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'Whether the product is active', default: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @ApiProperty({ description: 'Available stock quantity', default: 0, minimum: 0, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number = 0;

  @ApiProperty({ description: 'Product tags', type: [String], default: [], required: false, example: ['premium', 'software'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[] = [];
}