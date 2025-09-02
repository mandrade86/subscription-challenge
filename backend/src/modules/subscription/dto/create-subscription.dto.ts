import { IsMongoId } from 'class-validator';

export class CreateSubscriptionDto {
  @IsMongoId()
  productId: string;

  @IsMongoId()
  userId: string;
}
