import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSubscriptionDto } from './create-subscription.dto';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
  @ApiProperty({ description: 'Subscription status', enum: ['active', 'paused', 'cancelled', 'expired'], required: false })
  @IsEnum(['active', 'paused', 'cancelled', 'expired'])
  @IsOptional()
  status?: 'active' | 'paused' | 'cancelled' | 'expired';
}