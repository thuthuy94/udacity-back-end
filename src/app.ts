// eslint-disable-next-line object-curly-newline
import express, { Express, NextFunction, Request, Response } from 'express';
import errorHandler from './middlewares/errorHandler';
import imageRouter from './routes/images.route';
import NotFoundError from './utils/types/ErrorTypes/NotFoundError.type';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('A image processing server.');
});

app.use('/api/images', imageRouter);
app.get('*', async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export default app;
