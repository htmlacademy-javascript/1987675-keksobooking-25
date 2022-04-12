const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const setAvatarUpload = () => {
  const avatarChooser = document.querySelector('.ad-form__field input');
  const avatarPreview = document.querySelector('.ad-form-header__preview img');

  avatarChooser.addEventListener('change', () => {
    const avatarFile = avatarChooser.files[0];
    const avatarName = avatarFile.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => avatarName.endsWith(it));

    if (matches) {
      avatarPreview.src = URL.createObjectURL(avatarFile);
    }
  });
};

const setOfferPhotoUpload = () => {
  const offerPhotoChooser = document.querySelector('.ad-form__upload input');
  const offerPhotoPreviewContainer = document.querySelector('.ad-form__photo');

  offerPhotoChooser.addEventListener('change', () => {
    const offerPhotoFile = offerPhotoChooser.files[0];
    const offerPhotoName = offerPhotoFile.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => offerPhotoName.endsWith(it));

    if (matches) {
      offerPhotoPreviewContainer.innerHTML = `<img src="${URL.createObjectURL(offerPhotoFile)}" width="70" height="70" alt="Фото жилья">`;
    }
  });
};

const resetPreviews = () => {
  const avatarPreview = document.querySelector('.ad-form-header__preview img');
  avatarPreview.src = 'img/muffin-grey.svg';

  const offerPhotoPreviewContainer = document.querySelector('.ad-form__photo');
  offerPhotoPreviewContainer.innerHTML = '';
};


export { setAvatarUpload, setOfferPhotoUpload, resetPreviews };
