import { existsSync } from 'fs';
import path from 'path';

import ImageQueryI from '../utils/types/QueryType/ImageQueryI.types';

import processImage from '../utils/image-processing.util';

export default class Image {
  static imageFullFolderPath = path.resolve(
    __dirname,
    '../../public/assets/images/full',
  );

  static imageThumbFolderPath = path.resolve(
    __dirname,
    '../../public/assets/images/thumb',
  );

  static generateImageName = ({
    imageName,
    width,
    height,
  }: ImageQueryI): string => {
    if (!imageName) throw new Error();
    if (!(width || height)) {
      return path.resolve(this.imageFullFolderPath, `${imageName}.jpg`);
    }
    if (width && height) {
      return path.resolve(
        this.imageThumbFolderPath,
        `${imageName}-${width}x${height}.jpg`,
      );
    }
    throw new Error();
  };

  static isImageAvailable = ({
    imageName,
    width,
    height,
  }: ImageQueryI): boolean => {
    const imagePath = Image.generateImageName({ imageName, width, height });
    return existsSync(imagePath);
  };

  static createThumbImage = async ({
    imageName,
    width,
    height,
  }: ImageQueryI): Promise<void> => {
    if (!(imageName && width && height)) throw new Error();
    const src = Image.generateImageName({ imageName });
    const target = Image.generateImageName({ imageName, width, height });
    await processImage({
      source: src,
      target,
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    });
  };
}
