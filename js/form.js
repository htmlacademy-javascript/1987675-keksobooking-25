const setFormActivity = (status) => {
  const adForm = document.querySelector('.ad-form');
  const adFormFieldsets = adForm.querySelectorAll('fieldset');

  adFormFieldsets.forEach((fieldset) => {
    if (status) {
      adForm.classList.remove('ad-form--disabled');
      fieldset.removeAttribute('disabled', '');
    } else {
      adForm.classList.add('ad-form--disabled');
      fieldset.setAttribute('disabled', '');
    }
  });

  const mapFilters = document.querySelector('.map__filters');
  const mapFiltersFieldsets = Array.from(mapFilters.children);

  mapFiltersFieldsets.forEach((fieldset) => {
    if (status) {
      mapFilters.classList.remove('map__filters--disabled');
      fieldset.removeAttribute('disabled', '');
    } else {
      mapFilters.classList.add('map__filters--disabled');
      fieldset.setAttribute('disabled', '');
    }
  });
};

setFormActivity(false);
setFormActivity(true);

// const switchPageToActive = () => {
//   const adForm = document.querySelector('.ad-form');
//   const adFormFieldsets = adForm.querySelectorAll('fieldset');

//   adForm.classList.remove('ad-form--disabled');
//   adFormFieldsets.forEach((fieldset) => {
//     fieldset.removeAttribute('disabled', '');
//   });

//   const mapFilters = document.querySelector('.map__filters');
//   const mapFiltersFieldsets = Array.from(mapFilters.children);

//   mapFilters.classList.remove('map__filters--disabled');
//   mapFiltersFieldsets.forEach((fieldset) => {
//     fieldset.removeAttribute('disabled', '');
//   });
// };

