import supertest, { SuperTest, Test, Response } from 'supertest';
import path from 'path';
import { promises as fs, existsSync } from 'fs';
import Image from '../models/images.model';
import app from '../app';

const req: SuperTest<Test> = supertest(app);

describe('Endpoints: ', (): void => {
  describe('/', (): void => {
    it('should handle GET req', async (): Promise<void> => {
      const res: Response = await req.get('/');
      expect(res.status).toBe(200);
    });
  });

  describe('/api/images', (): void => {
    beforeEach(async (): Promise<void> => {
      const testImagePath: string = path.resolve(
        Image.imageThumbFolderPath,
        'richard-gere-69x69.jpg',
      );
      try {
        await fs.unlink(testImagePath);
      } catch {
        // do nothing
      }
    });
    it('should return valid message on health check route', async (): Promise<void> => {
      const res: Response = await req.get('/api/images/health-check');
      expect(res.status).toEqual(200);
    });
    it('should handle GET req with valid query', async (): Promise<void> => {
      const res: Response = await req.get('/api/images?imageName=richard-gere');
      expect(res.status).toBe(200);
    });
    it('should handle GET req with valid query (width and height)', async () => {
      const res: Response = await req.get(
        '/api/images?imageName=richard-gere&width=69&height=69',
      );
      expect(res.status).toEqual(200);
      const testImagePath: string = path.resolve(
        Image.imageThumbFolderPath,
        'richard-gere-69x69.jpg',
      );
      expect(existsSync(testImagePath)).toBeTruthy();
    });
    it('should handle GET req with invalid query (width)', async (): Promise<void> => {
      const res: Response = await req.get(
        '/api/images?imageName=richard-gere&height=200',
      );
      expect(res.status).toBe(400);
    });
    it('should handle GET req with invalid query (height)', async (): Promise<void> => {
      const res: Response = await req.get(
        '/api/images?imageName=richard-gere&width=200',
      );
      expect(res.status).toBe(400);
    });
    it('should handle GET req with invalid query (missing imageName)', async (): Promise<void> => {
      const res: Response = await req.get('/api/images');
      expect(res.status).toBe(400);
    });
    it('should handle GET req with unknown filename', async (): Promise<void> => {
      const res: Response = await req.get('/api/images?imageName=invalid');
      expect(res.status).toBe(404);
    });
  });
});
