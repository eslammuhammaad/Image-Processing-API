import express from 'express';
import path from 'path';
import fs from 'fs';
import { resize_image } from '../../utilities/resizingImage';

const images = express.Router();

images.get('/', async (req, res) => {
  const { image_name, height, width } = req.query;
  if (image_name) {
    const s: string = path.join('.', 'images', 'full', image_name as string);
    try {
      if (fs.existsSync(path.resolve(s))) {
        if (!width && !height) {
          res.sendFile(path.resolve(s));
        } else {
          if (width && height) {
            const image_path = path.join(
              '.',
              'images',
              'resized',
              image_name + `(${width})(${height})` + '.jpg'
            );
            if (fs.existsSync(path.resolve(image_path))) {
              res.sendFile(path.resolve(image_path));
            } else {
              const resized_image = await resize_image(
                path.resolve(s),
                image_name as string,
                parseInt(width as string),
                parseInt(height as string)
              );
              console.log(image_path);
              res.sendFile(path.resolve(resized_image));
            }
          } else {
            res.send('you must enter a positive number for width & height');
          }
        }
      } else {
        res.send(`There is no image name ${image_name} at this file`);
      }
    } catch (error) {
      console.log('error' + error);
    }
  } else {
    res.send('you must enter valid image name');
  }
});

export default images;
