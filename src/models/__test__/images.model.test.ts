import { existsSync, promises as fs } from 'fs';
import path from 'path';
import Image from '../images.model';

describe('ImageModel', (): void => {
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

  describe('generateImageName', (): void => {
    it('should return correct image name', (): void => {
      const res: string = Image.generateImageName({ imageName: 'image' });
      expect(res).toMatch(
        /\bpublic\b.*\bassets\b.*\bimages\b.*\bfull\b.*image.jpg/i,
      );
    });

    it('should return correct image name', (): void => {
      const res: string = Image.generateImageName({
        imageName: 'image',
        width: '200',
        height: '200',
      });
      expect(res).toMatch(
        /\bpublic\b.*\bassets\b.*\bimages\b.*\bthumb\b.*image-200x200.jpg/i,
      );
    });

    it('should throw HTTPException when get image with no name', async (): Promise<void> => {
      try {
        Image.generateImageName({});
        expect(false).toBeTruthy();
      } catch {
        expect(true).toBeTruthy();
      }
    });
  });

  describe('createThumbImage', (): void => {
    it('should create image successfully', async (): Promise<void> => {
      await Image.createThumbImage({
        imageName: 'richard-gere',
        width: '69',
        height: '69',
      });
      const testImagePath: string = path.resolve(
        Image.imageThumbFolderPath,
        'richard-gere-69x69.jpg',
      );

      expect(existsSync(testImagePath)).toBeTruthy();
    });

    it('should throw error if wrong query (missing width)', async (): Promise<void> => {
      expect.assertions(1);
      await expect(
        Image.createThumbImage({
          imageName: 'richard-gere',
          height: '69',
        }),
      ).rejects.toThrow();
    });

    it('should throw error if wrong query (missing height)', async (): Promise<void> => {
      expect.assertions(1);
      await expect(
        Image.createThumbImage({
          imageName: 'richard-gere',
          width: '69',
        }),
      ).rejects.toThrow();
    });

    it('should throw error if wrong query (missing height)', async (): Promise<void> => {
      expect.assertions(1);
      await expect(
        Image.createThumbImage({
          imageName: 'richard-gere',
          width: '69',
          height: '-69',
        }),
      ).rejects.toThrow();
    });
  });

  describe('isImageAvailable', (): void => {
    it('should return true if image available', (): void => {
      const res: boolean = Image.isImageAvailable({
        imageName: 'richard-gere',
      });
      expect(res).toEqual(true);
    });

    it('should return false if image available', (): void => {
      const res: boolean = Image.isImageAvailable({
        imageName: 'richard-gere-1',
      });
      expect(res).toEqual(false);
    });
    it('should return true if image cached', async (): Promise<void> => {
      await Image.createThumbImage({
        imageName: 'richard-gere',
        width: '69',
        height: '69',
      });
      const res: boolean = Image.isImageAvailable({
        imageName: 'richard-gere',
        width: '69',
        height: '69',
      });
      expect(res).toEqual(true);
    });

    it('should return false if image not cached', (): void => {
      const res: boolean = Image.isImageAvailable({
        imageName: 'richard-gere',
        width: '69',
        height: '69',
      });
      expect(res).toEqual(false);
    });
  });
});
