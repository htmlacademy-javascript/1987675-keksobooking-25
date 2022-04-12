import { declinationOfNum } from './util.js';

const OfferTypeToTitle = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALOW: 'Бунгало',
  HOTEL: 'Отель',
};

const PriceList = {
  LOW_COST: 10000,
  HIGH_COST: 50000,
};

const MainAddress = {
  LAT: 35.681729,
  LNG: 139.753927,
  ZOOM: 13,
};

const OFFERS_ON_MAP_NUMBER = 10;


const map = L.map('map-canvas').setView({
  lat: MainAddress.LAT,
  lng: MainAddress.LNG,
}, MainAddress.ZOOM);

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
    lat: MainAddress.LAT,
    lng: MainAddress.LNG,
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


const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const createPointPopup = (similarOffer) => {
  const offerElement = cardTemplate.cloneNode(true);

  offerElement.querySelector('.popup__avatar').setAttribute('src', similarOffer.author.avatar);
  offerElement.querySelector('.popup__title').textContent = similarOffer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = similarOffer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${similarOffer.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = OfferTypeToTitle[similarOffer.offer.type.toUpperCase()];
  offerElement.querySelector('.popup__text--capacity').textContent = `
    ${similarOffer.offer.rooms} ${declinationOfNum(similarOffer.offer.rooms, ['комната', 'комнаты', 'комнат'])}
    ${similarOffer.offer.guests === 0 ? 'не для гостей' : `для ${similarOffer.offer.guests} ${declinationOfNum(similarOffer.offer.guests, ['гостя', 'гостей', 'гостей'])}`}
    `;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarOffer.offer.checkin}, выезд до ${similarOffer.offer.checkout}`;
  offerElement.querySelector('.popup__features').innerHTML = '';
  if (similarOffer.offer.features) {
    similarOffer.offer.features.forEach((feature) => {
      const addedFeature = document.createElement('li');
      addedFeature.classList.add('popup__feature', `popup__feature--${feature}`);
      offerElement.querySelector('.popup__features').appendChild(addedFeature);
    });
  } else {
    offerElement.querySelector('.popup__features').remove();
  }

  offerElement.querySelector('.popup__description').innerHTML = '';
  if (similarOffer.offer.description) {
    offerElement.querySelector('.popup__description').textContent = similarOffer.offer.description;
  } else {
    offerElement.querySelector('.popup__description').remove();
  }

  offerElement.querySelector('.popup__photos').innerHTML = '';
  if (similarOffer.offer.photos) {
    similarOffer.offer.photos.forEach((photo) => {
      const addedPhoto = document.createElement('img');
      addedPhoto.src = photo;
      addedPhoto.classList.add('popup__photo');
      addedPhoto.width = '45';
      addedPhoto.height = '40';
      addedPhoto.alt = 'Фотография жилья';
      offerElement.querySelector('.popup__photos').appendChild(addedPhoto);
    });
  } else {
    offerElement.querySelector('.popup__photos').remove();
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
    .bindPopup(createPointPopup(similarOffer));
};


const filters = (offer) => {
  const checkedFeatures = Array.from(document.querySelectorAll('input[name="features"]:checked'));

  if (
    (offer.offer.type === document.querySelector('#housing-type').value || document.querySelector('#housing-type').value === 'any') &&

    ((offer.offer.price < PriceList.LOW_COST) && (document.querySelector('#housing-price').value === 'low') ||
      (offer.offer.price >= PriceList.LOW_COST && offer.offer.price <= PriceList.HIGH_COST) && (document.querySelector('#housing-price').value === 'middle') ||
      (offer.offer.price > PriceList.HIGH_COST) && (document.querySelector('#housing-price').value === 'high') ||
      document.querySelector('#housing-price').value === 'any') &&

    (offer.offer.rooms === parseInt(document.querySelector('#housing-rooms').value, 10) || document.querySelector('#housing-rooms').value === 'any') &&

    (offer.offer.guests === parseInt(document.querySelector('#housing-guests').value, 10) || document.querySelector('#housing-guests').value === 'any') &&

    ((!checkedFeatures.length) ||
      (offer.offer.features) && checkedFeatures.every((checkedFeature) => offer.offer.features.includes(checkedFeature.value)))
  ) {
    return true;
  }
  return false;
};


const putMarkersOnMap = (similarOffers) => {
  offersMarkerGroup.clearLayers();
  similarOffers
    .filter(filters)
    .slice(0, OFFERS_ON_MAP_NUMBER)
    .forEach((similarOffer) => {
      createMarker(similarOffer);
    });
};


const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: MainAddress.LAT,
    lng: MainAddress.LNG,
  });
  map.setView({
    lat: MainAddress.LAT,
    lng: MainAddress.LNG,
  }, MainAddress.ZOOM);

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
