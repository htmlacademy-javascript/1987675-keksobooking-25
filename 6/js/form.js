const setFormActivity = (status) => {
  const adForm = document.querySelector('.ad-form');
  const adFormFieldsets = adForm.querySelectorAll('fieldset');

  if (status) {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach((fieldset) => {
      fieldset.removeAttribute('disabled', '');
    });
  } else {
    adForm.classList.add('ad-form--disabled');
    adFormFieldsets.forEach((fieldset) => {
      fieldset.setAttribute('disabled', '');
    });
  }

  const mapFilters = document.querySelector('.map__filters');
  const mapFiltersFieldsets = Array.from(mapFilters.children);

  if (status) {
    mapFilters.classList.remove('map__filters--disabled');
    mapFiltersFieldsets.forEach((fieldset) => {
      fieldset.removeAttribute('disabled', '');
    });
  } else {
    mapFilters.classList.add('map__filters--disabled');
    mapFiltersFieldsets.forEach((fieldset) => {
      fieldset.setAttribute('disabled', '');
    });
  }
};

export {setFormActivity};
