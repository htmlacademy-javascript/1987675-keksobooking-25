const offerForm = document.querySelector('.ad-form');

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы
  errorClass: 'ad-form--invalid', // Класс, обозначающий невалидное поле
  successClass: 'ad-form--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'ad-form__error', // Класс для элемента с текстом ошибки
});
