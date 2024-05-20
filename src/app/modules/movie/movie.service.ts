import { MoviesModel } from '../movie.model';
import { TMovies } from './movie.interface';

const createMovieInDB = async (student: TMovies) => {
  const result = await MoviesModel.create(student);
  return result;
};
const getAllMoviesFromDB = async () => {
  const result = await MoviesModel.find();
  return result;
};
const getSingleMovieFromDB = async (_id: string) => {
  const result = await MoviesModel.findOne({ _id });
  return result;
};
const updateMovieFromDB = async (_id: string, updateMovie: any) => {
  const result = await MoviesModel.updateOne({ _id }, { $set: updateMovie });
  return result;
};

export const MovieService = {
  createMovieInDB,
  getAllMoviesFromDB,
  getSingleMovieFromDB,
  updateMovieFromDB,
};
