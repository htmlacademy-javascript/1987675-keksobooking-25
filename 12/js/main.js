import { setOfferFormSubmit, setFormActivity, setFiltersActivity, setResetButtonClick } from './form.js';
import { map, putMarkersOnMap, setFiltersChange } from './map.js';
import { getOffersData } from './api.js';
import { debounce, showAlert } from './util.js';

const PUT_MARKERS_DELAY = 500;

setFormActivity(false);
setFiltersActivity(false);

map.on('load', setFormActivity(true));
map.on('load', getOffersData((offers) => {
  putMarkersOnMap(offers);
  setFiltersActivity(true);
  setFiltersChange(debounce(
    () => putMarkersOnMap(offers),
    PUT_MARKERS_DELAY
  ));
  setResetButtonClick(() => putMarkersOnMap(offers));
  setOfferFormSubmit(() => putMarkersOnMap(offers));
}, showAlert));
