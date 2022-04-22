import supertest from 'supertest';
import path from 'path';
import app from '../index';
import { resize_image } from '../utilities/resizingImage';

const request = supertest(app);

describe('Test images api (endpoint) responses.', () => {
  it('Gets images api endpoint status to be 200.', async () => {
    const tested = await request.get('/api/images');
    expect(tested.status).toBe(200);
  });
});

describe('Test resize image function', () => {
  it('image path should be returned from resizeimage function as path entered', async () => {
    const original: string = path.join('.', 'images', 'full', 'fjord.jpg');
    const tested = await resize_image(original, 'fjord.jpg', 300, 300);
    let expected: string = path.join(
      '.',
      'images',
      'resized',
      'fjord' + `(300)(300)` + '.jpg'
    );
    expected = path.resolve(expected);
    expect(tested).toEqual(expected);
  });
});
