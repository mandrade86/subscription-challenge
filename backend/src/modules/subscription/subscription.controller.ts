import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import {
  CreateSubscriptionDto,
} from './dto/create-subscription.dto';
import { SubscriptionService } from './subscription.service';
import { AuthGuard } from '@/guards/auth-guard';

@UseGuards(AuthGuard)
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() dto: CreateSubscriptionDto): Promise<{ _id: string }> {
    return this.subscriptionService.create(dto);
  }
}
