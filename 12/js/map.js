/* eslint-disable arrow-body-style */

import { declinationOfNum } from './util.js';

const map = L.map('map-canvas').setView({
  lat: 35.681729,
  lng: 139.753927,
}, 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
},
).addTo(map);

const mainMarkerGroup = L.layerGroup().addTo(map);
const offersMarkerGroup = L.layerGroup().addTo(map);

const address = document.querySelector('#address');
address.setAttribute('readonly', '');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.681729,
    lng: 139.753927,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
)
  .addTo(mainMarkerGroup);

const mainLatLng = Object.values(mainPinMarker.getLatLng())
  .map((element) => element.toFixed(5));
address.value = mainLatLng;

mainPinMarker.on('move', (evt) => {
  const latLng = Object.values(evt.target.getLatLng())
    .map((element) => element.toFixed(5));
  address.value = Object.values(latLng);
});

const offerTypeToTitle = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};


const createPointPopups = (similarOffer) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const offerElement = cardTemplate.cloneNode(true);

  offerElement.querySelector('.popup__avatar').setAttribute('src', similarOffer.author.avatar);
  offerElement.querySelector('.popup__title').textContent = similarOffer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = similarOffer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${similarOffer.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = offerTypeToTitle[similarOffer.offer.type];

  // offerElement.querySelector('.popup__text--capacity').textContent = `${similarOffer.offer.rooms} комнат
  //   для ${similarOffer.offer.guests} гостей`;

  offerElement.querySelector('.popup__text--capacity').textContent = `
    ${similarOffer.offer.rooms} ${declinationOfNum(similarOffer.offer.rooms, ['комната', 'комнаты', 'комнат'])}
    ${similarOffer.offer.guests === 0 ? 'не для гостей' : `для ${similarOffer.offer.guests} ${declinationOfNum(similarOffer.offer.guests, ['гостя', 'гостей', 'гостей'])}`}
    `;


  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarOffer.offer.checkin}, выезд до ${similarOffer.offer.checkout}`;
  offerElement.querySelector('.popup__features').innerHTML = '';
  if (similarOffer.offer.features) {
    similarOffer.offer.features.forEach((feature) => {
      offerElement.querySelector('.popup__features').innerHTML += `<li class="popup__feature popup__feature--${feature}"></li>`;
    });
  }

  offerElement.querySelector('.popup__description').innerHTML = '';
  if (similarOffer.offer.description) {
    offerElement.querySelector('.popup__description').textContent = similarOffer.offer.description;
  }

  offerElement.querySelector('.popup__photos').innerHTML = '';
  if (similarOffer.offer.photos) {
    similarOffer.offer.photos.forEach((photo) => {
      offerElement.querySelector('.popup__photos')
        .innerHTML += `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`;
    });
  }

  return offerElement;
};


const regularPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const createMarker = (similarOffer) => {
  const {lat, lng} = similarOffer.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: regularPinIcon,
    },
  );

  marker
    .addTo(offersMarkerGroup)
    .bindPopup(createPointPopups(similarOffer));
};


const filterByType = (offer) => {
  return offer.offer.type === document.querySelector('#housing-type').value || document.querySelector('#housing-type').value === 'any';
};

const filterByPrice = (offer) => {
  if ((offer.offer.price < 10000) && (document.querySelector('#housing-price').value === 'low') ||
    (offer.offer.price > 10000 && offer.offer.price < 50000) && (document.querySelector('#housing-price').value === 'middle') ||
    (offer.offer.price > 50000) && (document.querySelector('#housing-price').value === 'high') ||
    document.querySelector('#housing-price').value === 'any') {
    return true;
  }
  return false;
};

const filterByRooms = (offer) => {
  return offer.offer.rooms === parseInt(document.querySelector('#housing-rooms').value, 10) || document.querySelector('#housing-rooms').value === 'any';
};

const filterByGuests = (offer) => {
  return offer.offer.guests === parseInt(document.querySelector('#housing-guests').value, 10) || document.querySelector('#housing-guests').value === 'any';
};

const filterByFeatures = (offer) => {
  const checkedFeatures = Array.from(document.querySelectorAll('input[name="features"]:checked'));

  if (!checkedFeatures.length) {
    return true;
  }

  if (offer.offer.features) {
    return checkedFeatures.every((checkedFeature) => offer.offer.features.includes(checkedFeature.value));
  }

  return false;
};


const putMarkersOnMap = (similarOffers) => {
  offersMarkerGroup.clearLayers();
  similarOffers
    .slice()
    .filter(filterByType)
    .filter(filterByPrice)
    .filter(filterByRooms)
    .filter(filterByGuests)
    .filter(filterByFeatures)
    .slice(0, 10)
    .forEach((similarOffer) => {
      createMarker(similarOffer);
    });
};


const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: 35.681729,
    lng: 139.753927,
  });
  map.setView({
    lat: 35.681729,
    lng: 139.753927,
  }, 13);

  map.closePopup();
};


const mapFilters = document.querySelector('.map__filters');

const resetFilters = () => {
  mapFilters.reset();
};


const setFiltersChange = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};


export {map, putMarkersOnMap, resetMap, resetFilters, setFiltersChange };
