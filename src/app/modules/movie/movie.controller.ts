import { Request, Response } from 'express';
import { MovieService } from './movie.service';
import MovieValidationSchema from './movie.validation';

const createMovie = async (req: Request, res: Response) => {
  try {
    const { movie: movieData } = req.body;
    // validation Zed using
    const zodParsedData = MovieValidationSchema.parse(movieData);
    // will call service function  to send this data business logic all append services file
    const result = await MovieService.createMovieInDB(zodParsedData);

    // send response

    res.status(200).json({
      success: true,
      message: 'Movie created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: 'Movie Not created ',
      err: err.message,
    });
  }
};

const getAllMovies = async (req: Request, res: Response) => {
  try {
    const result = await MovieService.getAllMoviesFromDB();
    res.status(200).json({
      success: true,
      message: 'Movies fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: 'Movie Not fetched  ',
      err: err.message,
    });
  }
};

const getSingleMovie = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const result = await MovieService.getSingleMovieFromDB(movieId);
    res.status(200).json({
      success: true,
      message: 'Fetched single movie  successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: 'single movie not found',
      err: err.message,
    });
  }
};
const updateMovie = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const updateMovie = req.body;
    const result = await MovieService.updateMovieFromDB(movieId, updateMovie);
    res.status(200).json({
      success: true,
      message: 'Movie updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: 'single movie not updated',
      err: err.message,
    });
  }
};
export const MovieController = {
  createMovie,
  getAllMovies,
  getSingleMovie,
  updateMovie,
};
