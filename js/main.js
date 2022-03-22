import {setFormActivity} from './form.js';
import {createMap} from './map.js';

setFormActivity(false);

const map = createMap();
map.on('load', setFormActivity(true));
