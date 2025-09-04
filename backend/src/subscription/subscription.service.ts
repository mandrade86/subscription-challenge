import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription } from './schemas/subscription.schema';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    const startDate = new Date();
    const endDate = new Date();
    const nextBillingDate = new Date();

    // Calculate end date based on subscription type
    if (createSubscriptionDto.type === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
    } else if (createSubscriptionDto.type === 'yearly') {
      endDate.setFullYear(endDate.getFullYear() + 1);
      nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
    } else if (createSubscriptionDto.type === 'trial') {
      endDate.setDate(endDate.getDate() + 14); // 14 days trial
      nextBillingDate.setDate(nextBillingDate.getDate() + 14);
    }

    const createdSubscription = new this.subscriptionModel({
      ...createSubscriptionDto,
      status: 'active',
      startDate,
      endDate,
      nextBillingDate,
      autoRenew: createSubscriptionDto.autoRenew ?? true,
    });

    return createdSubscription.save();
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionModel
      .find()
      .populate('userId', 'name email')
      .populate('productId', 'name price')
      .exec();
  }

  async findById(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionModel
      .findById(id)
      .populate('userId', 'name email')
      .populate('productId', 'name price')
      .exec();
    
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    return subscription;
  }

  async findByUserId(userId: string): Promise<Subscription[]> {
    return this.subscriptionModel
      .find({ userId })
      .populate('productId', 'name price')
      .exec();
  }

  async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto): Promise<Subscription> {
    const updatedSubscription = await this.subscriptionModel
      .findByIdAndUpdate(id, updateSubscriptionDto, { new: true })
      .populate('userId', 'name email')
      .populate('productId', 'name price')
      .exec();
    
    if (!updatedSubscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    return updatedSubscription;
  }

  async pauseSubscription(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionModel.findById(id).exec();
    
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    
    if (subscription.status !== 'active') {
      throw new BadRequestException('Only active subscriptions can be paused');
    }

    subscription.status = 'paused';
    return subscription.save();
  }

  async resumeSubscription(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionModel.findById(id).exec();
    
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    
    if (subscription.status !== 'paused') {
      throw new BadRequestException('Only paused subscriptions can be resumed');
    }

    subscription.status = 'active';
    return subscription.save();
  }

  async cancelSubscription(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionModel.findById(id).exec();
    
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    
    if (subscription.status === 'cancelled') {
      throw new BadRequestException('Subscription is already cancelled');
    }

    subscription.status = 'cancelled';
    subscription.autoRenew = false;
    return subscription.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.subscriptionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
  }
}