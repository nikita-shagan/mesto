let popup = document.querySelector('.popup');
let popupCloser = popup.querySelector('.popup__close');
let popupOpener = document.querySelector(".profile__edit-btn");

let formElement = popup.querySelector('.popup__form');
let inputName = popup.querySelector('#popup-name');
let inputAbout = popup.querySelector('#popup-about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__description');

let likeButtons = document.querySelectorAll('.place__like');


function popupToggle () {
  popupOpener.addEventListener('click', function () {
    popup.classList.add('popup_visible');
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
  })
  popupCloser.addEventListener('click', function () {
    popup.classList.remove('popup_visible');
  })
}


function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popup.classList.remove('popup_visible');
}

function likeToggle (likes) {
  for (let i = 0; i < likes.length; i++) {
    likes[i].addEventListener('click', function () {
      likes[i].classList.toggle('place__like_active');
    })
  }
}


popupToggle();
likeToggle(likeButtons);
formElement.addEventListener('submit', handleFormSubmit);
