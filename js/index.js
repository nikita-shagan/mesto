const popupProfileEditor = document.querySelector('.popup_sort_profile');
const popupPlacesEditor = document.querySelector('.popup_sort_place');
const popupProfileEditorCloser = popupProfileEditor.querySelector('.popup__close');
const popupPlacesEditorCloser = popupPlacesEditor.querySelector('.popup__close');
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
  addPlace(placesInputName.value, placesInputLink.value);
  closePopupPlacesEditor();
  placesInputName.value = '';
  placesInputLink.value = '';
}

function addPlace(name, link) {
  const placeTemplate = document.querySelector('#place').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  placeElement.querySelector('.place__name').textContent = name;
  placeElement.querySelector('.place__image').src = link;
  placesList.prepend(placeElement);
  console.log(placeElement);

  const deleteButton = placeElement.querySelector('.place__delete');
  const likeButton = placeElement.querySelector('.place__like');
  deleteButton.addEventListener('click', () => placeElement.remove());
  likeButton.addEventListener('click', () => likeButton.classList.toggle('place__like_active'));
}

initialPlaces.forEach(item => addPlace(item.name, item.link));

formProfileElement.addEventListener('submit', handleFormSubmitProfile);
formPlacesElement.addEventListener('submit', handleFormSubmitPlaces);

editProfileButton.addEventListener('click', openPopupProfileEditor);
addPlaceButton.addEventListener('click', openPopupPlacesEditor);

popupProfileEditorCloser.addEventListener('click', closePopupProfileEditor);
popupPlacesEditorCloser.addEventListener('click', closePopupPlacesEditor);
