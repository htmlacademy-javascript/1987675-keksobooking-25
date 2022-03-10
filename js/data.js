/* eslint-disable arrow-body-style */

import {getRandomInteger, getRandomFloat, getRandomArrayElement} from './util.js';

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const CHECK_IN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const OFFER_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
const PROPERTY_TYPES = Object.keys(OFFER_TYPES);
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;
const OFFERS_COUNT = 10;

const getRandomFeatures = () => {
  const randomFeatures = [];
  for (let i = 0; i < getRandomInteger(1, FEATURES.length); i++) {
    const randomIndex = getRandomInteger(0, FEATURES.length - 1);
    if (!randomFeatures.includes(FEATURES[randomIndex])) {
      randomFeatures.push(FEATURES[randomIndex]);
    }
  }
  return randomFeatures;
};

const getRandomPhotos = () => {
  const randomPhoto = [];
  while (randomPhoto.length < getRandomInteger(0, 10)) {
    randomPhoto.push(PHOTOS[getRandomInteger(0, PHOTOS.length - 1)]);
  }
  return randomPhoto;
};

const createOffer = (_element, offerIndex) => {
  const avatarImgIndex = offerIndex+1 < 10 ? `0${offerIndex+1}` : offerIndex+1;
  const lat = getRandomFloat(LATITUDE_MIN, LATITUDE_MAX, 5);
  const lng = getRandomFloat(LONGITUDE_MIN, LONGITUDE_MAX, 5);
  return {
    author: {
      avatar: `img/avatars/user${avatarImgIndex}.png`,
    },
    offer: {
      title: `Обьявление №${offerIndex+1}`,
      address: `${lat}, ${lng}`,
      price: getRandomInteger(0, 1000),
      type: getRandomArrayElement(PROPERTY_TYPES),
      rooms: getRandomInteger(1, 20),
      guests: getRandomInteger(1, 100),
      checkin: getRandomArrayElement(CHECK_IN_TIME),
      checkout: getRandomArrayElement(CHECK_IN_TIME),
      features: getRandomFeatures(),
      description: `Описание помещения ${offerIndex+1}`,
      photos: getRandomPhotos(),
    },
    location: {
      lat,
      lng,
    },
  };
};

const createOffers = () => {
  return Array.from({length: OFFERS_COUNT}, createOffer);
};

export {createOffers, OFFER_TYPES};
