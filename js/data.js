/* eslint-disable arrow-body-style */

import {getRandomInteger, getRandomFloat, getRandomArrayElement} from './util.js';

const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const checkInTimes = [
  '12:00',
  '13:00',
  '14:00',
];
const offerTypeToTitle = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
const propertyTypes = Object.keys(offerTypeToTitle);
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const Coordinates = {
  LAT_MIN: 35.65000,
  LAT_MAX: 35.70000,
  LNG_MIN: 139.70000,
  LNG_MAX: 139.80000,
};
const OFFERS_COUNT = 10;
const getRandomFeatures = () => {
  const randomFeatures = [];
  for (let i = 0; i < getRandomInteger(1, features.length); i++) {
    const randomIndex = getRandomInteger(0, features.length - 1);
    if (!randomFeatures.includes(features[randomIndex])) {
      randomFeatures.push(features[randomIndex]);
    }
  }
  return randomFeatures;
};

const getRandomPhotos = () => {
  const randomPhoto = [];
  while (randomPhoto.length < getRandomInteger(0, 10)) {
    randomPhoto.push(photos[getRandomInteger(0, photos.length - 1)]);
  }
  return randomPhoto;
};

const createOffer = (_element, offerIndex) => {
  const avatarImgIndex = offerIndex+1 < 10 ? `0${offerIndex+1}` : offerIndex+1;
  const lat = getRandomFloat(Coordinates.LAT_MIN, Coordinates.LAT_MAX, 5);
  const lng = getRandomFloat(Coordinates.LNG_MIN, Coordinates.LNG_MAX, 5);
  return {
    author: {
      avatar: `img/avatars/user${avatarImgIndex}.png`,
    },
    offer: {
      title: `Обьявление №${offerIndex+1}`,
      address: `${lat}, ${lng}`,
      price: getRandomInteger(0, 1000),
      type: getRandomArrayElement(propertyTypes),
      rooms: getRandomInteger(1, 20),
      guests: getRandomInteger(1, 100),
      checkin: getRandomArrayElement(checkInTimes),
      checkout: getRandomArrayElement(checkInTimes),
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

export {createOffers, offerTypeToTitle};
