/* eslint-disable no-console */
import {setFormActivity} from './form.js';
import {map} from './map.js';

setFormActivity(false);
map.on('load', setFormActivity(true));
