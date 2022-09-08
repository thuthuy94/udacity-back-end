import HttpException from './HTTPException.type';

class BadRequestError extends HttpException {
  constructor() {
    super(400, 'This is a bad request');
  }
}

export default BadRequestError;
