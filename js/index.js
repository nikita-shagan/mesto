import { initialPlaces } from "./initialPlaces.js"
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import {popupProfileEditor,
  popupPlacesEditor,
  popupPicture,
  popups,
  popupProfileOpenButton,
  popupPlacesOpenButton,
  formProfileElement,
  inputName,
  inputAbout,
  profileName,
  profileAbout,
  formPlacesElement,
  placeInputName,
  placeInputLink,
  pictureZoomed,
  pictureCaption,
  placesContainer,
  formSetup
} from './constants.js'

const formProfileValidator = new FormValidator(formSetup, formProfileElement)
const formPlacesValidator = new FormValidator(formSetup, formPlacesElement)


function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}


function closePopupByOverlay(evt, popup) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup)
  }
}


function closePopupByX(evt, popup) {
  if (evt.target.classList.contains('popup__close')) {
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
  formProfileValidator.resetValidation()
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
  formPlacesElement.reset();
  formPlacesValidator.resetValidation()
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
    popup.addEventListener('mousedown', evt => closePopupByOverlay(evt, popup))
  })

  popups.forEach(popup => {
    popup.addEventListener('click', evt => closePopupByX(evt, popup))
  })
}


formProfileValidator.enableValidation()
formPlacesValidator.enableValidation()

renderInitialPlaces()
addEventListeners()
