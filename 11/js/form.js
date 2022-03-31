/* eslint-disable arrow-body-style */

import { resetFilters, resetMap } from './map.js';
import { sendOfferData } from './api.js';
import { createSlider } from './slider.js';
import { blockSubmitButton, showAlert, unblockSubmitButton } from './util.js';


const offerForm = document.querySelector('.ad-form');


const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error',
});


const roomNumberField = offerForm.querySelector('#room_number');
const capacityField = offerForm.querySelector('#capacity');

const roomNumberOption = {
  '1': '1',
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': '0',
};

const validateCapacity = () => {
  return roomNumberOption[roomNumberField.value].includes(capacityField.value);
};

const getCapacityErrorMessage = () => {
  return `
    ${roomNumberField.options[roomNumberField.selectedIndex].textContent}
    не подходит
    ${capacityField.options[capacityField.selectedIndex].textContent}
  `;
};

pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);

const onRoomNumberChange = () => {
  pristine.validate(capacityField);
};

roomNumberField.addEventListener('change', onRoomNumberChange);


const typeField = offerForm.querySelector('#type');
const priceField = offerForm.querySelector('#price');

const typeOption = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};

const onTypeChange = () => {
  priceField.min = typeOption[typeField.value];
  priceField.placeholder = typeOption[typeField.value];
  pristine.validate(priceField);
};

typeField.addEventListener('change', onTypeChange);

const validatePrice = () => {
  return priceField.value >= +typeOption[typeField.value];
};

const getPriceErrorMessage = () => {
  return `Минимальная цена для выбранного типа жилья ${typeOption[typeField.value]} ₽/ночь`;
};

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);


const sliderPrice = createSlider();

sliderPrice.noUiSlider.on('slide', () => {
  pristine.validate(priceField);
});


const timeInField = offerForm.querySelector('#timein');
const timeOutField = offerForm.querySelector('#timeout');

const onTimeInChange = () => {
  timeOutField.value = timeInField.value;
};

const onTimeOutChange = () => {
  timeInField.value = timeOutField.value;
};

timeInField.addEventListener('change', onTimeInChange);
timeOutField.addEventListener('change', onTimeOutChange);


const setFormActivity = (status) => {
  const adForm = document.querySelector('.ad-form');
  const adFormFieldsets = adForm.querySelectorAll('fieldset');

  if (status) {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach((fieldset) => {
      fieldset.removeAttribute('disabled', '');
    });
  } else {
    adForm.classList.add('ad-form--disabled');
    adFormFieldsets.forEach((fieldset) => {
      fieldset.setAttribute('disabled', '');
    });
  }

  const mapFilters = document.querySelector('.map__filters');
  const mapFiltersFieldsets = Array.from(mapFilters.children);

  if (status) {
    mapFilters.classList.remove('map__filters--disabled');
    mapFiltersFieldsets.forEach((fieldset) => {
      fieldset.removeAttribute('disabled', '');
    });
  } else {
    mapFilters.classList.add('map__filters--disabled');
    mapFiltersFieldsets.forEach((fieldset) => {
      fieldset.setAttribute('disabled', '');
    });
  }
};


const showSuccessSendMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  document.body.appendChild(successMessage);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      successMessage.remove();
    }
  });

  document.addEventListener('click', () => {
    successMessage.remove();
  });
};


const showErrorSendMessage = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  document.body.appendChild(errorMessage);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      errorMessage.remove();
    }
  });

  document.addEventListener('click', () => {
    errorMessage.remove();
  });
};


const setOfferFormSubmit = () => {
  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendOfferData(
        new FormData(evt.target),
        () => {
          unblockSubmitButton();
          showSuccessSendMessage();
          offerForm.reset();
          resetMap();
          resetFilters();
        },
        () => {
          unblockSubmitButton();
          showErrorSendMessage();
        }
      );
    } else {
      showAlert('Обязательные поля не заполнены');
    }
  });
};


const resetButton = offerForm.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  offerForm.reset();
  resetMap();
  resetFilters();
});


export {setOfferFormSubmit, setFormActivity };
