/* eslint-disable arrow-body-style */
/* eslint-disable no-alert */
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


offerForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
    alert('Обязательные поля не заполнены');
  }
});


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
