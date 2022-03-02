/* eslint-disable arrow-body-style */
/* eslint-disable no-console */

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
const PROPERTY_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const OFFERS_COUNT = 10;

const getRandomInteger = (min, max) => {
  if (min < 0) {
    console.error('Диапазон должен быть положительным, включая ноль');
    return null;
  }
  const integerMin = Math.ceil(min);
  const integerMax = Math.floor(max);
  if (integerMin >= integerMax) {
    console.error('Ближайшее к заданному начальному значению целое больше или равно конечному целому значению диапазона');
    return null;
  }
  return Math.floor(Math.random() * (integerMax - integerMin + 1)) + integerMin;
};

const getRandomFloat = (min, max, floating = 0) => {
  if (min < 0) {
    console.error('Диапазон должен быть положительным, включая ноль');
    return null;
  }
  if (min >= max) {
    console.error('Начальное значение диапазона больше или равно конечному');
    return null;
  }
  const randomFloat = Math.random() * (max - min) + min;
  return Math.round(randomFloat * 10 ** floating) / 10 ** floating;
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const getRandomFeatures = () => {
  const randomFeatures = [];
  for (let i = 0; i < getRandomInteger(1, FEATURES.length); i++) {
    const randomIndex = getRandomInteger(1, FEATURES.length - 1);
    if (!randomFeatures.includes(FEATURES[randomIndex])) {
      randomFeatures.push(FEATURES[randomIndex]);
    }
  }
  return (randomFeatures);
};

const getRandomPhotos = () => {
  const randomPhoto = [];
  while (randomPhoto.length < getRandomInteger(0, 10)) {
    randomPhoto.push(PHOTOS[getRandomInteger(1, PHOTOS.length - 1)]);
  }
  return randomPhoto;
};

const createOffer = (_, N) => {
  const avatarImgIndex = N+1 < 10 ? `0${N+1}` : N+1;
  const lat = getRandomFloat(35.65000, 35.70000, 5);
  const lng = getRandomFloat(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: `img/avatars/user${avatarImgIndex}.png`,
    },
    offer: {
      title: `Обьявление №${N+1}`,
      address: `${lat}, ${lng}`,
      price: getRandomInteger(0, 1000),
      type: getRandomArrayElement(PROPERTY_TYPES),
      rooms: getRandomInteger(1, 20),
      guests: getRandomInteger(1, 100),
      checkin: getRandomArrayElement(CHECK_IN_TIME),
      checkout: getRandomArrayElement(CHECK_IN_TIME),
      features: getRandomFeatures(),
      description: `Описание помещения ${N+1}`,
      photos: getRandomPhotos(),
    },
    location: {
      lat,
      lng,
    },
  };
};

const offers = Array.from({length: OFFERS_COUNT}, createOffer);
console.log(offers);
