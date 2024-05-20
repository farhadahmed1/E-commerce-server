import { z } from 'zod';

const inventoryValidationSchema = z.object({
  quantity: z.number().positive().int({
    message: 'Quantity must be a positive integer',
  }),
  inStock: z.boolean(), // No need for required as inStock defaults to false
});

const variantValidationSchema = z.object({
  type: z.string().trim().min(1, { message: 'Variant type is required' }),
  value: z.string().trim().min(1, { message: 'Variant value is required' }),
});

const productValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name must be at least 1 character long' })
    .transform((str) => str[0].toUpperCase() + str.slice(1)), // Capitalize first letter
  description: z
    .string()
    .trim()
    .min(20, { message: 'Description must be at least 1 character long' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.string().trim().min(1, { message: 'Category is required' }),
  tags: z.array(z.string()).default([]),
  variants: z.array(variantValidationSchema), // Ensures each element is a valid Variant
  inventory: inventoryValidationSchema, // Ensures inventory object is valid
});

export default productValidationSchema; //
