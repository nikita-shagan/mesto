const popupProfileEditor = document.querySelector('.popup_sort_profile');
const popupPlacesEditor = document.querySelector('.popup_sort_place');
const popupPicture = document.querySelector('.popup_sort_picture')
const popupProfileEditorCloser = popupProfileEditor.querySelector('.popup__close');
const popupPlacesEditorCloser = popupPlacesEditor.querySelector('.popup__close');
const popupPictureCloser = popupPicture.querySelector('.popup__close');
const editProfileButton = document.querySelector('.profile__edit-btn');
const addPlaceButton = document.querySelector('.profile__add-btn');

const formProfileElement = popupProfileEditor.querySelector('.popup__form');
const inputName = popupProfileEditor.querySelector('.popup__input_kind_name');
const inputAbout = popupProfileEditor.querySelector('.popup__input_kind_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');

const formPlacesElement = popupPlacesEditor.querySelector('.popup__form');
const placesInputName = popupPlacesEditor.querySelector('.popup__input_kind_name');
const placesInputLink = popupPlacesEditor.querySelector('.popup__input_kind_link');


const placesList = document.querySelector('.places__list');

const initialPlaces = [
  {
    name: 'Алтай',
    link: '../images/altai.jpg'
  },
  {
    name: 'Судак',
    link: '../images/sudak.jpg'
  },
  {
    name: 'Шерегеш',
    link: '../images/sheregesh.jpg'
  },
  {
    name: 'Байкал',
    link: '../images/baikal.jpg'
  },
  {
    name: 'Эльбрус',
    link: '../images/elbrus.jpg'
  },
  {
    name: 'Камчатка',
    link: '../images/kamchatka.jpg'
  }
];

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function renderPopupProfile() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupProfileEditor);
}

function handleFormSubmitPlaces(evt) {
  evt.preventDefault();
  addPlace(placesInputName.value, placesInputLink.value);
  closePopup(popupPlacesEditor);
  placesInputName.value = '';
  placesInputLink.value = '';
}

function addPlace(name, link) {
  const placeTemplate = document.querySelector('#place').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

  const deleteButton = placeElement.querySelector('.place__delete');
  const likeButton = placeElement.querySelector('.place__like');
  const picture = placeElement.querySelector('.place__image');
  const pictureZoomed = document.querySelector('.zoomed-picture__image');
  const pictureCaption = document.querySelector('.zoomed-picture__caption');

  placeElement.querySelector('.place__name').textContent = name;
  picture.src = link;
  picture.alt = name;
  placesList.prepend(placeElement);

  deleteButton.addEventListener('click', () => placeElement.remove());
  likeButton.addEventListener('click', () => likeButton.classList.toggle('place__like_active'));
  picture.addEventListener('click', () => {
    openPopup(popupPicture);
    pictureZoomed.src = link;
    pictureCaption.textContent = name;
  });
}

initialPlaces.forEach(item => addPlace(item.name, item.link));

formProfileElement.addEventListener('submit', handleFormSubmitProfile);
formPlacesElement.addEventListener('submit', handleFormSubmitPlaces);

editProfileButton.addEventListener('click', () => {
  openPopup(popupProfileEditor);
  renderPopupProfile();
});

addPlaceButton.addEventListener('click', () => openPopup(popupPlacesEditor));

popupProfileEditorCloser.addEventListener('click', () => closePopup(popupProfileEditor));
popupPlacesEditorCloser.addEventListener('click', () => closePopup(popupPlacesEditor));
popupPictureCloser.addEventListener('click', () => closePopup(popupPicture));
