/* eslint-disable arrow-body-style */
/* eslint-disable no-console */

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

export {getRandomInteger, getRandomFloat, getRandomArrayElement};
