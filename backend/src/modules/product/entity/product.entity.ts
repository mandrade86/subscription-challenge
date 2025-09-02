import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  available: number
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductModel = HydratedDocument<Product>;
