export const popupProfileEditorSelector = '.popup_sort_profile'
export const profileNameSelector = '.profile__name'
export const profileAboutSelector = '.profile__description'
export const formProfileElement = document.querySelector(`${popupProfileEditorSelector} .popup__form`)
export const inputProfileName = document.querySelector(`${popupProfileEditorSelector} .popup__input_kind_name`)
export const inputProfileAbout = document.querySelector(`${popupProfileEditorSelector} .popup__input_kind_about`)
export const popupProfileOpenButton = document.querySelector('.profile__edit-btn')


export const popupPlacesEditorSelector ='.popup_sort_place'
export const formPlacesElement = document.querySelector(`${popupPlacesEditorSelector} .popup__form`)
export const popupPlacesOpenButton = document.querySelector('.profile__add-btn')


export const popupPictureSelector = '.popup_sort_picture'
export const pictureZoomed = document.querySelector('.zoomed-picture__image')
export const pictureCaption = document.querySelector('.zoomed-picture__caption')


export const placesContainerSelector = '.places__list'
export const formSetup = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
}