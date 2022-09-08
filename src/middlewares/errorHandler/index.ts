import { Request, Response } from 'express';
import HttpException from '../../utils/types/ErrorTypes/HTTPException.type';

const errorHandler = (err: HttpException, req: Request, res: Response) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).send({ status, message });
};

export default errorHandler;
