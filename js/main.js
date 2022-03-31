import { setOfferFormSubmit, setFormActivity } from './form.js';
import { map, putMarkersOnMap } from './map.js';
import { getOffersData } from './api.js';
import { showAlert } from './util.js';

setFormActivity(false);

getOffersData(putMarkersOnMap, showAlert);

map.on('load', setFormActivity(true));

setOfferFormSubmit();
