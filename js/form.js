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

const validateRoomNumber = () => {
  return roomNumberOption[roomNumberField.value].includes(capacityField.value);
};

const getRoomNumberErrorMessage = () => {
  return `
    ${roomNumberField.options[roomNumberField.selectedIndex].textContent}
    не подходит
    ${capacityField.options[capacityField.selectedIndex].textContent}
  `;
};

pristine.addValidator(roomNumberField, validateRoomNumber);
pristine.addValidator(capacityField, validateRoomNumber, getRoomNumberErrorMessage);

offerForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
    alert('Обязательные поля не заполнены');
  }
});
