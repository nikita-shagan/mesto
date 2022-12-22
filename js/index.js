const popup = document.querySelector('.popup');
const popupCloser = popup.querySelector('.popup__close');
const popupOpener = document.querySelector(".profile__edit-btn");

const formElement = popup.querySelector('.popup__form');
const inputName = popup.querySelector('.popup__input_kind_name');
const inputAbout = popup.querySelector('.popup__input_kind_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');

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
    name: 'Байкал',
    link: '../images/baikal.jpg'
  },
  {
    name: 'Ельбрус',
    link: '../images/elbrus.jpg'
  },
  {
    name: 'Камчатка',
    link: '../images/kamchatka.jpg'
  },
  {
    name: 'Шерегеш',
    link: '../images/sheregesh.jpg'
  }
];

function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}


function closePopup() {
  popup.classList.remove('popup_opened');
}


function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup()
}

function addCard(name, link) {
  const cardTemplate = document.querySelector('#place').content;
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);
  cardElement.querySelector('.place__name').textContent = name;
  cardElement.querySelector('.place__image').src = link;
  placesList.append(cardElement);
}

initialCards.forEach(item => addCard(item.name, item.link));

formElement.addEventListener('submit', handleFormSubmit);
popupOpener.addEventListener('click', openPopup)
popupCloser.addEventListener('click', closePopup)
