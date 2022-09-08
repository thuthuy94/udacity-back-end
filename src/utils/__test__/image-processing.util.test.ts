import { existsSync, promises as fs } from 'fs';
import path from 'path';
import Image from '../../models/images.model';
import processImage from '../image-processing.util';

describe('processImage', (): void => {
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

  it('should generate new thumb Image', async () => {
    const src = Image.generateImageName({ imageName: 'richard-gere' });
    const target = Image.generateImageName({
      imageName: 'richard-gere',
      width: '69',
      height: '69',
    });
    await processImage({
      source: src,
      target,
      width: 69,
      height: 69,
    });
    expect(existsSync(target)).toBeTruthy();
  });

  it('should throw error if Image size is defected', async () => {
    const src = Image.generateImageName({ imageName: 'richard-gere' });
    const target = Image.generateImageName({
      imageName: 'richard-gere',
      width: '69',
      height: '69',
    });
    expect.assertions(1);
    await expect(
      processImage({
        source: src,
        target,
        width: -100,
        height: 69,
      }),
    ).rejects.toThrow();
  });
});
