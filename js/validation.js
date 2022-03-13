const offerForm = document.querySelector('.ad-form');


const pristineTitle = new Pristine(offerForm, {
  classTo: 'ad-form__title',
  errorTextParent: 'ad-form__title',
  errorTextClass: 'ad-form__title__error-text',
});

// const pristinePrice = new Pristine(offerForm, {
//   classTo: 'ad-form__price',
//   errorTextParent: 'ad-form__price',
//   errorTextClass: 'ad-form__price__error-text',
// });


// const createPristineConfig = (to, textParent, textClass) => {
//   return {
//     classTo: to,
//     errorTextParent: textParent,
//     errorTextClass: textClass,
//   };
// };

// const pristinePriceConfig = createPristineConfig('ad-form__price', 'ad-form__price', 'ad-form__price__error-text');

// const pristinePrice = new Pristine(offerForm, pristinePriceConfig);
