import { z } from 'zod';

// Define Zod schema for a single review
const ReviewValidationSchema = z.object({
  email: z
    .string()
    .email()
    .refine((val) => val !== '', {
      message: 'Email is required and must be valid',
    }),
  rating: z
    .number()
    .int()
    .min(1)
    .max(5)
    .refine((val) => val !== undefined, {
      message: 'Rating is required and must be an integer between 1 and 5',
    }),
  comment: z.string().refine((val) => val !== '', {
    message: 'Comment is required',
  }),
});

// Define Zod schema for movies
const MovieValidationSchema = z.object({
  title: z.string().refine((val) => val !== '', {
    message: 'Title is required',
  }),
  description: z.string().refine((val) => val !== '', {
    message: 'Description is required',
  }),
  releaseDate: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date().optional()),

  genre: z.string().refine((val) => val !== '', {
    message: 'Genre is required',
  }),
  isDeleted: z.boolean().default(false),
  viewCount: z.number().default(0),
  reviews: z.array(ReviewValidationSchema),
});

export default MovieValidationSchema;
