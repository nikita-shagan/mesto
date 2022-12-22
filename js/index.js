import { initialPlaces } from "./initialPlaces.js";

const popupProfileEditor = document.querySelector('.popup_sort_profile');
const popupPlacesEditor = document.querySelector('.popup_sort_place');
const popupPicture = document.querySelector('.popup_sort_picture')
const popupProfileEditorCloser = popupProfileEditor.querySelector('.popup__close');
const popupPlacesEditorCloser = popupPlacesEditor.querySelector('.popup__close');
const popupPictureCloser = popupPicture.querySelector('.popup__close');
const popupProfileOpenButton = document.querySelector('.profile__edit-btn');
const popupPlacesOpenButton = document.querySelector('.profile__add-btn');

const formProfileElement = popupProfileEditor.querySelector('.popup__form');
const inputName = popupProfileEditor.querySelector('.popup__input_kind_name');
const inputAbout = popupProfileEditor.querySelector('.popup__input_kind_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');

const formPlacesElement = popupPlacesEditor.querySelector('.popup__form');
const placeInputName = popupPlacesEditor.querySelector('.popup__input_kind_name');
const placeInputLink = popupPlacesEditor.querySelector('.popup__input_kind_link');

const placesList = document.querySelector('.places__list');

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
  const placeNew = createPlace(placeInputName.value, placeInputLink.value);
  addPlace(placeNew, placesList);
  closePopup(popupPlacesEditor);
  placeInputName.value = '';
  placeInputLink.value = '';
}

function createPlace(name, link) {
  const placeTemplate = document.querySelector('#place').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

  const buttonDelete = placeElement.querySelector('.place__delete');
  const likeButton = placeElement.querySelector('.place__like');
  const picture = placeElement.querySelector('.place__image');
  const pictureZoomed = document.querySelector('.zoomed-picture__image');
  const pictureCaption = document.querySelector('.zoomed-picture__caption');

  placeElement.querySelector('.place__name').textContent = name;
  picture.src = link;
  picture.alt = name;

  buttonDelete.addEventListener('click', () => placeElement.remove());
  likeButton.addEventListener('click', () => likeButton.classList.toggle('place__like_active'));
  picture.addEventListener('click', () => {
    openPopup(popupPicture);
    pictureZoomed.src = link;
    pictureZoomed.alt = name;
    pictureCaption.textContent = name;
  });
  return placeElement;
}

function addPlace(place, container) {
  container.prepend(place);
}

initialPlaces.forEach(item => {
  const placeNew = createPlace(item.name, item.link)
  addPlace(placeNew, placesList);
});

formProfileElement.addEventListener('submit', handleFormSubmitProfile);
formPlacesElement.addEventListener('submit', handleFormSubmitPlaces);

popupProfileOpenButton.addEventListener('click', () => {
  openPopup(popupProfileEditor);
  renderPopupProfile();
});

popupPlacesOpenButton.addEventListener('click', () => openPopup(popupPlacesEditor));

popupProfileEditorCloser.addEventListener('click', () => closePopup(popupProfileEditor));
popupPlacesEditorCloser.addEventListener('click', () => closePopup(popupPlacesEditor));
popupPictureCloser.addEventListener('click', () => closePopup(popupPicture));
