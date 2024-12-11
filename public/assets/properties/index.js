// src/assets/images/properties/index.js

import a25_1 from './a25/1.jpg'; 
import a25_2 from './a25/2.jpg';
import a25_3 from './a25/3.jpg';
import a25_4 from './a25/4.jpg';

import b110_1 from './b110/1.jpg';
import b110_2 from './b110/2.jpg';
import b110_3 from './b110/3.jpg';
import b110_4 from './b110/4.jpg';

import b27_1 from './b27/1.jpg';
import b27_2 from './b27/2.jpg';
import b27_3 from './b27/3.jpg';
import b27_4 from './b27/4.jpg';

import b29_1 from './b29/1.jpg';
import b29_2 from './b29/2.jpg';
import b29_3 from './b29/3.jpg';
import b29_4 from './b29/4.jpg';

import prima21_1 from './prima21/1.jpg';
import prima21_2 from './prima21/2.jpg';
import prima21_3 from './prima21/3.jpg';
import prima21_4 from './prima21/4.jpg';

import prima26_1 from './prima26/1.jpg';
import prima26_2 from './prima26/2.jpg';
import prima26_3 from './prima26/3.jpg';
import prima26_4 from './prima26/4.jpg';

import prima51_1 from './prima51/1.jpg';
import prima51_2 from './prima51/2.jpg';
import prima51_3 from './prima51/3.jpg';
import prima51_4 from './prima51/4.jpg';

export const propertyImages = {
  a25: [a25_1, a25_2, a25_3, a25_4],
  b110: [b110_1, b110_2, b110_3, b110_4],
  b27: [b27_1, b27_2, b27_3, b27_4],
  b29: [b29_1, b29_2, b29_3, b29_4],
  prima21: [prima21_1, prima21_2, prima21_3, prima21_4],
  prima26: [prima26_1, prima26_2, prima26_3, prima26_4],
  prima51: [prima51_1, prima51_2, prima51_3, prima51_4]
};

export const getPropertyImages = (propertyId) => {
  return propertyImages[propertyId] || [];
};