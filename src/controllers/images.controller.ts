import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../utils/types/ErrorTypes/BadRequestError.type';
import NotFoundError from '../utils/types/ErrorTypes/NotFoundError.type';
import Image from '../models/images.model';
import ImageQueryI from '../utils/types/QueryType/ImageQueryI.types';

export const validateFileName = async ({
  imageName,
  width,
  height,
}: ImageQueryI): Promise<void> => {
  if (!imageName) throw new BadRequestError();
  if (!(await Image.isImageAvailable({ imageName }))) throw new NotFoundError();
  if (!(width || height)) return;
  const widthNum: number = parseInt(width || '', 10);
  if (Number.isNaN(widthNum) || widthNum < 1) throw new BadRequestError();
  const heightNum: number = parseInt(height || '', 10);
  if (Number.isNaN(heightNum) || heightNum < 1) throw new BadRequestError();
};

export const getImages = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { query: imageQuery } = req;
    await validateFileName(imageQuery);

    const { width, height } = imageQuery;

    if (width && height && !Image.isImageAvailable(imageQuery)) {
      await Image.createThumbImage(imageQuery);
    }
    const path = Image.generateImageName(imageQuery);

    res.sendFile(path);
  } catch (err) {
    next(err);
  }
};
