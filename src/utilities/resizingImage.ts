import sharp from 'sharp';
import path from 'path';
export const resize_image = async (
  image_path: string,
  image_name: string,
  width: number,
  height: number
): Promise<string> => {
  image_name = image_name.replace('.jpg', '');
  let resized_image = path.join(
    '.',
    'images',
    'resized',
    image_name + `(${width})(${height})` + '.jpg'
  );
  resized_image = path.resolve(resized_image);
  await sharp(image_path).resize(width, height).toFile(resized_image);
  return resized_image;
};
