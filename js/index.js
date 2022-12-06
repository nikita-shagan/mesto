let popup = document.querySelector('.popup');
let popupCloser = popup.querySelector('.popup__close');
let popupOpener = document.querySelector(".profile__edit-btn");

let formElement = popup.querySelector('.popup__form');
let inputName = popup.querySelector('.popup__input_kind_name');
let inputAbout = popup.querySelector('.popup__input_kind_about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__description');


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


formElement.addEventListener('submit', handleFormSubmit);
popupOpener.addEventListener('click', openPopup)
popupCloser.addEventListener('click', closePopup)
