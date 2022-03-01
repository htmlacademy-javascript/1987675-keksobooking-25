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
getRandomInteger();

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
getRandomFloat();

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};
getRandomArrayElement(0);

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
getRandomFeatures();


const avatarsAdresses = (function (avatarsCount) {
  const array = [];
  for (let i = 0; i < avatarsCount; i++) {
    if (i + 1 < 10) {
      array[i] = `img/avatars/user0${i + 1}.png`;
    } else {
      array[i] = `img/avatars/user${i + 1}.png`;
    }
  }
  return array;
}(OFFERS_COUNT));


const createOffer = () => {
  return {
    author: {
      avatar: avatarsAdresses[0],
    },
    offer: {
      title: `Offer № ${getRandomInteger(1, 1000)}`,
      address: '',
      price: getRandomInteger(0, 1000),
      type: getRandomArrayElement(PROPERTY_TYPES),
      rooms: getRandomInteger(1, 20),
      guests: getRandomInteger(1, 100),
      checkin: getRandomArrayElement(CHECK_IN_TIME),
      checkout: getRandomArrayElement(CHECK_IN_TIME),
      features: getRandomFeatures(),
      description: 'Описание пом',
      photos: '',
    },
    location: {
      lat: getRandomFloat(35.65000, 35.70000, 5),
      lng: getRandomFloat(139.70000, 139.80000, 5),
    },
  };
};
createOffer();
console.log(createOffer().author.avatar);


// const ObjectOneOfTen = {
//   Author {
//     avatar: img/avatars/user01.png
//   }
//
//   Offer {
//     title: 'строка - заголовок предложения. Придумайте самостоятельно',
//     address: location.lat, location.lng,
//     price: //Случайное целое положительное число
//     type: //строка - одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel
//     rooms: //Случайное целое положительное число
//     guests: //Случайное целое положительное число
//     checkin: //строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00
//     checkout: //строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00
//     features: //массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться
//     description: //строка — описание помещения. Придумайте самостоятельно
//     photos: //массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg
//   }
//
//   Location {
//     lat: //число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000
//     lng: //число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000
//   }
// }


// const ObjectTwoOfTen = {
//   Author {
//     avatar: img/avatars/user02.png
//   }
//
//   Offer {
//     title: 'строка - заголовок предложения. Придумайте самостоятельно',
//     address: location.lat, location.lng,
//     price: //Случайное целое положительное число
//     type: //строка - одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel
//     rooms: //Случайное целое положительное число
//     guests: //Случайное целое положительное число
//     checkin: //строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00
//     checkout: //строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00
//     features: //массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться
//     description: //строка — описание помещения. Придумайте самостоятельно
//     photos: //массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg
//   }
//
//   Location {
//     lat: //число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000
//     lng: //число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000
//   }
// }
