const getRandomInteger = (min, max) => {
  if (min < 0) {
    return undefined;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  if (min >= max) {
    return undefined;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, floating) => {
  if (min < 0) {
    return undefined;
  }

  if (min >= max) {
    return undefined;
  }

  const randomFloat = Math.random() * (max - min) + min;
  return Math.round(randomFloat * Math.pow(10, floating)) / Math.pow(10, floating);
};
