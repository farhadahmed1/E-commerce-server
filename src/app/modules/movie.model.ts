import { Schema, model } from 'mongoose';
import { TMovies, TReview } from './movie/movie.interface';

const reviewsSchema = new Schema<TReview>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});
const moviesSchema = new Schema<TMovies>({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  releaseDate: {
    type: String,
  },
  genre: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  reviews: [reviewsSchema],
});
export const MoviesModel = model<TMovies>('Movies', moviesSchema);
