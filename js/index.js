import { initialPlaces } from "./initialPlaces.js"
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const popupProfileEditor = document.querySelector('.popup_sort_profile')
const popupPlacesEditor = document.querySelector('.popup_sort_place')
const popupPicture = document.querySelector('.popup_sort_picture')
const popups = Array.from(document.querySelectorAll('.popup'))
const popupProfileOpenButton = document.querySelector('.profile__edit-btn')
const popupPlacesOpenButton = document.querySelector('.profile__add-btn')

const formProfileElement = popupProfileEditor.querySelector('.popup__form')
const inputName = popupProfileEditor.querySelector('.popup__input_kind_name')
const inputAbout = popupProfileEditor.querySelector('.popup__input_kind_about')
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__description')

const formPlacesElement = popupPlacesEditor.querySelector('.popup__form')
const placeInputName = popupPlacesEditor.querySelector('.popup__input_kind_name')
const placeInputLink = popupPlacesEditor.querySelector('.popup__input_kind_link')

const pictureZoomed = document.querySelector('.zoomed-picture__image')
const pictureCaption = document.querySelector('.zoomed-picture__caption')
const placesContainer = document.querySelector('.places__list')
const formSetup = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
}


function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}


function closePopupByOverlay(evt, popup) {
  if (evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget) {
    closePopup(popup)
  }
}


function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupByEscape)
}


function openPopupProfile() {
  openPopup(popupProfileEditor)
  inputName.value = profileName.textContent
  inputAbout.value = profileAbout.textContent
}


function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByEscape)
}


function openZoomedPicture(placeData) {
  openPopup(popupPicture)
  pictureZoomed.src = placeData.link
  pictureZoomed.alt = placeData.name
  pictureCaption.textContent = placeData.name
}


function createPlaceCard(placeData) {
  const placeElement = new Card(placeData, '#place')
  const newPlaceCard = placeElement.createCard()
  const placePicture = newPlaceCard.querySelector('.place__image')
  placePicture.addEventListener('click', () => openZoomedPicture(placeData))
  return newPlaceCard
}


function addPlaceCard(placeCard, container) {
  container.prepend(placeCard)
}


function handleFormSubmitProfile(evt) {
  evt.preventDefault()
  profileName.textContent = inputName.value
  profileAbout.textContent = inputAbout.value
  closePopup(popupProfileEditor)
}


function handleFormSubmitPlaces(evt) {
  evt.preventDefault()
  const newPlaceData = {
    name: placeInputName.value,
    link: placeInputLink.value
  }
  const newPlaceCard = createPlaceCard(newPlaceData)
  addPlaceCard(newPlaceCard, placesContainer)
  closePopup(popupPlacesEditor)
  placeInputName.value = ''
  placeInputLink.value = ''

  const buttonElement = evt.submitter
  buttonElement.classList.add('popup__submit-btn_disabled')
  buttonElement.setAttribute('disabled', true)
}


function renderInitialPlaces() {
  initialPlaces.forEach(item => {
    const newPlaceCard = createPlaceCard(item)
    addPlaceCard(newPlaceCard, placesContainer)
  })
}


function addEventListeners() {
  formProfileElement.addEventListener('submit', handleFormSubmitProfile)
  formPlacesElement.addEventListener('submit', handleFormSubmitPlaces)

  popupProfileOpenButton.addEventListener('click', openPopupProfile)
  popupPlacesOpenButton.addEventListener('click', () => openPopup(popupPlacesEditor))

  popups.forEach(popup => {
    popup.addEventListener('click', evt => closePopupByOverlay(evt, popup))
  })
}


function enableValidation(classesObj) {
  const formsList = Array.from(document.querySelectorAll(classesObj.formSelector))
  formsList.forEach(formElement => {
    const formValidator = new FormValidator(formSetup, formElement)
    formValidator.enableValidation()
  })
}

renderInitialPlaces()
addEventListeners()
enableValidation(formSetup)
