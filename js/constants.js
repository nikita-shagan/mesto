export const popupProfileEditor = document.querySelector('.popup_sort_profile')
export const popupPlacesEditor = document.querySelector('.popup_sort_place')
export const popupPicture = document.querySelector('.popup_sort_picture')
export const popups = Array.from(document.querySelectorAll('.popup'))
export const popupProfileOpenButton = document.querySelector('.profile__edit-btn')
export const popupPlacesOpenButton = document.querySelector('.profile__add-btn')

export const formProfileElement = popupProfileEditor.querySelector('.popup__form')
export const inputName = popupProfileEditor.querySelector('.popup__input_kind_name')
export const inputAbout = popupProfileEditor.querySelector('.popup__input_kind_about')
export const profileName = document.querySelector('.profile__name')
export const profileAbout = document.querySelector('.profile__description')

export const formPlacesElement = popupPlacesEditor.querySelector('.popup__form')
export const placeInputName = popupPlacesEditor.querySelector('.popup__input_kind_name')
export const placeInputLink = popupPlacesEditor.querySelector('.popup__input_kind_link')

export const pictureZoomed = document.querySelector('.zoomed-picture__image')
export const pictureCaption = document.querySelector('.zoomed-picture__caption')
export const placesContainer = document.querySelector('.places__list')
export const formSetup = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
}
