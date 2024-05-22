import { ProductModel } from '../product/product.model';
import { TOrder } from './order.interface';
import { OderModel } from './order.model';

const createOrder = async (payload: TOrder) => {
  // Step 1: Find the product in the inventory
  const product = await ProductModel.findById(payload.productId);

  if (!product) {
    throw new Error('Product not found');
  }

  // Step 2: Check if the ordered quantity exceeds the available quantity
  if (payload.quantity > product.inventory.quantity) {
    throw new Error('Insufficient stock');
  }

  // Step 3: Create the order
  const order = await OderModel.create(payload);

  // Step 4: Update the product quantity and inStock status
  product.inventory.quantity -= payload.quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  return order;
};

// 2-Retrieve a list of all orders using "get" method
const getAllOrders = async () => {
  const result = await OderModel.find();
  return result;
};

// 3-Search orders by user email using "get" method
const searchOrders = async (email: string | null) => {
  const result = await OderModel.find({
    email,
  });
  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  searchOrders,
};
