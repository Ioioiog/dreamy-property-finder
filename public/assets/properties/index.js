// src/assets/images/properties/index.js

import a25_living from './a25/living.jpg'; 
import a25_bedroom from './a25/bedroom.jpg';
import a25_bathroom from './a25/bathroom.jpg';
import a25_balcony from './a25/balcony.jpg';
import a25_kitchen from './a25/kitchen.jpg';

import b110_living from './b110/living.jpg';
import b110_bedroom from './b110/bedroom.jpg';
import b110_bathroom from './b110/bathroom.jpg';
import b110_balcony from './b110/balcony.jpg';
import b110_kitchen from './b110/kitchen.jpg';

import b27_living from './b27/living.jpg';
import b27_bedroom from './b27/bedroom.jpg';
import b27_bathroom from './b27/bathroom.jpg';
import b27_balcony from './b27/balcony.jpg';
import b27_kitchen from './b27/kitchen.jpg';

import b29_living from './b29/living.jpg';
import b29_bedroom from './b29/bedroom.jpg';
import b29_bathroom from './b29/bathroom.jpg';
import b29_balcony from './b29/balcony.jpg';
import b29_kitchen from './b29/kitchen.jpg';

import prima21_living from './prima21/living.jpg';
import prima21_bedroom from './prima21/bedroom.jpg';
import prima21_bathroom from './prima21/bathroom.jpg';
import prima21_balcony from './prima21/balcony.jpg';
import prima21_kitchen from './prima21/kitchen.jpg';

import prima26_living from './prima26/living.jpg';
import prima26_bedroom from './prima26/bedroom.jpg';
import prima26_bathroom from './prima26/bathroom.jpg';
import prima26_balcony from './prima26/balcony.jpg';
import prima26_kitchen from './prima26/kitchen.jpg';

import prima51_living from './prima51/living.jpg';
import prima51_bedroom from './prima51/bedroom.jpg';
import prima51_bathroom from './prima51/bathroom.jpg';
import prima51_balcony from './prima51/balcony.jpg';
import prima51_kitchen from './prima51/kitchen.jpg';

export const propertyImages = {
  a25: [a25_living, a25_bedroom, a25_bathroom, a25_balcony, a25_kitchen],
  b110: [b110_living, b110_bedroom, b110_bathroom, b110_balcony, b110_kitchen],
  b27: [b27_living, b27_bedroom, b27_bathroom, b27_balcony, b27_kitchen],
  b29: [b29_living, b29_bedroom, b29_bathroom, b29_balcony, b29_kitchen],
  prima21: [prima21_living, prima21_bedroom, prima21_bathroom, prima21_balcony, prima21_kitchen],
  prima26: [prima26_living, prima26_bedroom, prima26_bathroom, prima26_balcony, prima26_kitchen],
  prima51: [prima51_living, prima51_bedroom, prima51_bathroom, prima51_balcony, prima51_kitchen]
};

export const getPropertyImages = (propertyId) => {
  return propertyImages[propertyId] || [];
};