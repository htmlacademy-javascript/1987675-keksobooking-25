const GET_DATA_ADDRESS = 'https://25.javascript.pages.academy/keksobooking/data';
const SEND_DATA_ADDRESS = 'https://25.javascript.pages.academy/keksobooking';

const getOffersData = (onSuccess, onFail) => {
  fetch (GET_DATA_ADDRESS)
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
    SEND_DATA_ADDRESS,
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
