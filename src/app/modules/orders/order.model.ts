import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const ordersSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email address'], // Mongoose email validation
  },
  productId: {
    type: String,
    required: [true, 'Product ID is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity must be a positive number'],
  },
});
export const OderModel = model<TOrder>('Oder', ordersSchema);
