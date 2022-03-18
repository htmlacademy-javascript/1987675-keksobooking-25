/* eslint-disable arrow-body-style */
/* eslint-disable no-alert */
const offerForm = document.querySelector('.ad-form');
const roomNumberField = offerForm.querySelector('#room_number');
const capacityField = offerForm.querySelector('#capacity');

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error',
});

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

pristine.addValidator(roomNumberField, validateCapacity);
pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);

const typeField = offerForm.querySelector('#type');
const priceField = offerForm.querySelector('#price');

const typeOption = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};

const validateType = () => {
  priceField.setAttribute('min', typeOption[typeField.value]);
  priceField.setAttribute('placeholder', typeOption[typeField.value]);
};

typeField.addEventListener('change', validateType);

const validatePrice = () => {
  return priceField.value >= +priceField.getAttribute('min');
};

const getPriceErrorMessage = () => {
  return `Минимальная цена для выбранного типа жилья ${typeOption[typeField.value]} ₽/ночь`;
};

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

offerForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
    alert('Обязательные поля не заполнены');
  }
});

//--------------------
// «Тип жилья» — выбор опции меняет атрибуты минимального значения и плейсхолдера поля «Цена за ночь».
// На основе атрибута с минимальным значением должна отрабатывать валидация поля «Цена за ночь».

// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
// «Бунгало» — минимальная цена за ночь 0;
// «Квартира» — минимальная цена за ночь 1 000;
// «Отель» — минимальная цена за ночь 3 000;
// «Дом» — минимальная цена 5 000;
// «Дворец» — минимальная цена 10 000.
//-----------------------------------------------------------------------------------------------------------------------------
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

export {setFormActivity};
