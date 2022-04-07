/* eslint-disable arrow-body-style */
/* eslint-disable no-console */

const ALERT_SHOW_TIME = 5000;


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


const declinationOfNum = (number, words) => {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
};


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '5px 3px';
  alertContainer.style.fontSize = '24px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


const submitButton = document.querySelector('.ad-form__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуется...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};


const debounce = (cb, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};


export { getRandomInteger, getRandomFloat, getRandomArrayElement, showAlert, blockSubmitButton, unblockSubmitButton, debounce, declinationOfNum };
