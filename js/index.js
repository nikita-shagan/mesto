const popupProfileEditor = document.querySelector('.popup_sort_profile');
const popupPlacesEditor = document.querySelector('.popup_sort_place');
const popupProfileEditorCloser = popupProfileEditor.querySelector('.popup__close');
const popupPlacesEditorCloser = popupPlacesEditor.querySelector('.popup__close');
const editProfileButton = document.querySelector('.profile__edit-btn');
const addCardButton = document.querySelector('.profile__add-btn');

const formProfileElement = popupProfileEditor.querySelector('.popup__form');
const inputName = popupProfileEditor.querySelector('.popup__input_kind_name');
const inputAbout = popupProfileEditor.querySelector('.popup__input_kind_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');

const formPlacesElement = popupPlacesEditor.querySelector('.popup__form');
const placesInputName = popupPlacesEditor.querySelector('.popup__input_kind_name');
const placesInputLink = popupPlacesEditor.querySelector('.popup__input_kind_link');

const placesList = document.querySelector('.places__list');

const initialCards = [
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

function openPopupProfileEditor() {
  popupProfileEditor.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function openPopupPlacesEditor() {
  popupPlacesEditor.classList.add('popup_opened');
}

function closePopupProfileEditor() {
  popupProfileEditor.classList.remove('popup_opened');
}

function closePopupPlacesEditor() {
  popupPlacesEditor.classList.remove('popup_opened');
}

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopupProfileEditor()
}

function handleFormSubmitPlaces(evt) {
  evt.preventDefault();
  addCard(placesInputName.value, placesInputLink.value);
  closePopupPlacesEditor();
  placesInputName.value = '';
  placesInputLink.value = '';
}

function addCard(name, link) {
  const cardTemplate = document.querySelector('#place').content;
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);
  cardElement.querySelector('.place__name').textContent = name;
  cardElement.querySelector('.place__image').src = link;
  placesList.prepend(cardElement);
}

initialCards.forEach(item => addCard(item.name, item.link));

const likeButtons = document.querySelectorAll('.place__like');
Array.from(likeButtons).forEach(item => item.addEventListener('click', () => item.classList.toggle('place__like_active')));

formProfileElement.addEventListener('submit', handleFormSubmitProfile);
formPlacesElement.addEventListener('submit', handleFormSubmitPlaces);

editProfileButton.addEventListener('click', openPopupProfileEditor);
addCardButton.addEventListener('click', openPopupPlacesEditor);

popupProfileEditorCloser.addEventListener('click', closePopupProfileEditor);
popupPlacesEditorCloser.addEventListener('click', closePopupPlacesEditor);
