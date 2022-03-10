import {createOffers} from './data.js';

const similarOffers = createOffers();
const cardTemplate = document.querySelector('#card').content;
const mapCanvas = document.querySelector('#map-canvas');
const offerElements = [];

const OfferType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

similarOffers.forEach((offer) => {
  const offerElement = cardTemplate.cloneNode(true);

  offerElement.querySelector('.popup__title').textContent = offer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = OfferType[offer.offer.type]; //!!!
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  offerElement.querySelector('.popup__features').innerHTML = '';
  for (let i = 0; i < offer.offer.features.length; i++) {
    offerElement.querySelector('.popup__features').innerHTML += `<li class="popup__feature popup__feature--${offer.offer.features[i]}"></li>`;
  }

  offerElement.querySelector('.popup__description').textContent = offer.offer.description;
  if (!offerElement.querySelector('.popup__description').textContent) {
    offerElement.querySelector('.popup__description').innerHTML = '';
  }

  offerElement.querySelector('.popup__photos').innerHTML = '';
  for (let i = 0; i < offer.offer.photos.length; i++) {
    offerElement.querySelector('.popup__photos').innerHTML += `<img src="${offer.offer.photos[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`;
  }

  offerElements.push(offerElement);
});

mapCanvas.appendChild(offerElements[9]);
