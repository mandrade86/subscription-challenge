import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Subscription extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ enum: ['active', 'paused', 'cancelled', 'expired'], default: 'active' })
  status: 'active' | 'paused' | 'cancelled' | 'expired';

  @Prop({ enum: ['monthly', 'yearly', 'trial'], required: true })
  type: 'monthly' | 'yearly' | 'trial';

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  nextBillingDate: Date;

  @Prop({ default: true })
  autoRenew: boolean;

  @Prop({ required: true, min: 0 })
  price: number;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);