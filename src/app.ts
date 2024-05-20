import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { MovieRoutes } from './app/modules/movie/movie.route';
const app: Application = express();

// parsers

app.use(express.json());
app.use(cors());
// application routes

app.use('/api/movies', MovieRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello movies World!');
});

export default app;
