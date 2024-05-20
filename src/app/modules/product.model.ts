import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product/product.interface';

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});
const variantsSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [String],
  variants: [variantsSchema],
  inventory: inventorySchema,
});
export const ProductModel = model<TProduct>('Product', productSchema);
