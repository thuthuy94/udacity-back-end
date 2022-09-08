import sharp from 'sharp';

interface SharpSizeParamsI {
  source: string;
  target: string;
  width: number;
  height: number;
}

const processImage = async ({
  source,
  target,
  width,
  height,
}: SharpSizeParamsI): Promise<void> => {
  try {
    await sharp(source).resize(width, height).jpeg().toFile(target);
  } catch {
    throw new Error();
  }
};

export default processImage;
