import { Request, Response, Router } from 'express';
import { getImages } from '../controllers/images.controller';

const router: Router = Router();

router.get('/', getImages);
router.get('/health-check', (req: Request, res: Response) => {
  res.send('KhanhTX is here');
});

export default router;
