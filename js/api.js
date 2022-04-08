const getOffersData = (onSuccess, onFail) => {
  fetch ('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error;
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      onFail('Не удалось загрузить данные с сервера');
    });
};


const sendOfferData = (formData, onSucces, onFail) => {
  fetch (
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSucces();
      } else {
        throw new Error;
      }
    })
    .catch(() => {
      onFail();
    });
};


export {getOffersData, sendOfferData};
