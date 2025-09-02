import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import type { Model } from 'mongoose';
import { CreateSubscriptionDto } from '../subscription/dto/create-subscription.dto';
import {
  Subscription,
  SubscriptionModel,
} from '../subscription/entity/subscription.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);

  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<SubscriptionModel>
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto
  ): Promise<{ _id: string }> {
    try {
      // Check if subscription already exists
      const existingSubscription = await this.subscriptionModel.findOne({
        userId: createSubscriptionDto.userId,
        productId: createSubscriptionDto.productId,
      });

      if (existingSubscription) {
        throw new ConflictException(
          'Subscription already exists for this user and product'
        );
      }

      const createdSubscription = await this.subscriptionModel.create(
        createSubscriptionDto
      );

      return {
        _id: createdSubscription._id.toHexString(),
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      this.logger.error('Failed to create subscription', {
        error: error.message,
        stack: error.stack,
        dto: createSubscriptionDto,
      });

      if (error.name === 'ValidationError') {
        throw new BadRequestException('Invalid subscription data provided');
      }

      throw new InternalServerErrorException('Unable to create subscription');
    }
  }
}
