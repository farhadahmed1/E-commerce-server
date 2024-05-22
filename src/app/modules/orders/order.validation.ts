import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  productId: z.string().min(1, { message: 'Product ID is required' }),
  price: z
    .number()
    .positive({ message: 'Price must be greater than 0' })
    .nonnegative({ message: 'Price is required' }),
  quantity: z
    .number()
    .positive({ message: 'Quantity must be greater than 0' })
    .nonnegative({ message: 'Quantity is required' }),
});

export default orderValidationSchema;
