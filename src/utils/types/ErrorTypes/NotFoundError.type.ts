import HttpException from './HTTPException.type';

class NotFoundError extends HttpException {
  constructor() {
    super(404, 'Something is not found');
  }
}

export default NotFoundError;
