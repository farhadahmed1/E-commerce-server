import express from 'express';
import { MovieController } from './movie.controller';

const router = express.Router();

// will call controller function
router.post('/create-movie', MovieController.createMovie);
router.get('/', MovieController.getAllMovies);
router.get('/:movieId', MovieController.getSingleMovie);
router.put('/:movieId', MovieController.updateMovie);

export const MovieRoutes = router;
