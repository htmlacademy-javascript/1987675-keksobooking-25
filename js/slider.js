const createSlider = () => {
  const sliderPrice = document.querySelector('.ad-form__slider');
  const priceField = document.querySelector('#price');

  noUiSlider.create(sliderPrice, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 1000,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value),
    },
  });

  sliderPrice.noUiSlider.on('update', () => {
    priceField.value = sliderPrice.noUiSlider.get();
  });

  priceField.addEventListener('input', () => {
    sliderPrice.noUiSlider.set(priceField.value);
  });

  return sliderPrice;
};


export {createSlider};
