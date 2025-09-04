import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({ description: 'User ID who owns the subscription', example: '64a7b8f123456789abcdef01' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Product ID for the subscription', example: '64a7b8f123456789abcdef02' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Subscription type', enum: ['monthly', 'yearly', 'trial'], example: 'monthly' })
  @IsEnum(['monthly', 'yearly', 'trial'])
  type: 'monthly' | 'yearly' | 'trial';

  @ApiProperty({ description: 'Whether subscription auto-renews', default: true, required: false })
  @IsBoolean()
  @IsOptional()
  autoRenew?: boolean = true;

  @ApiProperty({ description: 'Subscription price', example: 29.99, minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;
}