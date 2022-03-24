import {createOffers, offerTypeToTitle} from './data.js';

const createMap = () => {
  const map = L.map('map-canvas').setView({
    lat: 35.681729,
    lng: 139.753927,
  }, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  ).addTo(map);

  const markerGroup = L.layerGroup().addTo(map);


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
  );
  mainPinMarker.addTo(markerGroup);

  const mainLatLng = Object.values(mainPinMarker.getLatLng())
    .map((element) => element.toFixed(5));
  address.value = mainLatLng;

  mainPinMarker.on('move', (evt) => {
    const latLng = Object.values(evt.target.getLatLng())
      .map((element) => element.toFixed(5));
    address.value = Object.values(latLng);
  });


  const similarOffers = createOffers();

  const createPointPopups = (similarOffer) => {
    const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
    const offerElement = cardTemplate.cloneNode(true);

    offerElement.querySelector('.popup__avatar').setAttribute('src', similarOffer.author.avatar);
    offerElement.querySelector('.popup__title').textContent = similarOffer.offer.title;
    offerElement.querySelector('.popup__text--address').textContent = similarOffer.offer.address;
    offerElement.querySelector('.popup__text--price').textContent = `${similarOffer.offer.price} ₽/ночь`;
    offerElement.querySelector('.popup__type').textContent = offerTypeToTitle[similarOffer.offer.type];
    offerElement.querySelector('.popup__text--capacity').textContent = `${similarOffer.offer.rooms} комнаты для ${similarOffer.offer.guests} гостей`;
    offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarOffer.offer.checkin}, выезд до ${similarOffer.offer.checkout}`;
    offerElement.querySelector('.popup__features').innerHTML = '';
    for (let i = 0; i < similarOffer.offer.features.length; i++) {
      offerElement.querySelector('.popup__features').innerHTML += `<li class="popup__feature popup__feature--${similarOffer.offer.features[i]}"></li>`;
    }

    offerElement.querySelector('.popup__description').textContent = similarOffer.offer.description;
    if (!offerElement.querySelector('.popup__description').textContent) {
      offerElement.querySelector('.popup__description').innerHTML = '';
    }

    offerElement.querySelector('.popup__photos').innerHTML = '';
    for (let i = 0; i < similarOffer.offer.photos.length; i++) {
      offerElement.querySelector('.popup__photos').innerHTML += `<img src="${similarOffer.offer.photos[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`;
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
      .addTo(markerGroup)
      .bindPopup(createPointPopups(similarOffer));
  };

  similarOffers.forEach((similarOffer) => {
    createMarker(similarOffer);
  });

  return map;
};

export {createMap};
