const getRandomInteger = (min, max) => {
  if (min < 0) {
    return 'Диапазон должен быть положительным, включая ноль';
  }

  if (Math.ceil(min) >= Math.floor(max)) {
    return 'Ближайшее к заданному начальному значению целое больше или равно конечному целому значению диапазона';
  }

  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
};

const getRandomFloat = (min, max, floating = 0) => {
  if (min < 0) {
    return 'Диапазон должен быть положительным, включая ноль';
  }

  if (min >= max) {
    return 'Начальное значение диапазона больше или равно конечному';
  }

  const RANDOM_FLOAT = Math.random() * (max - min) + min;
  return Math.round(RANDOM_FLOAT * Math.pow(10, floating)) / Math.pow(10, floating);
};

getRandomInteger(0.16, 1.921);
getRandomFloat(0, 12, 3);
