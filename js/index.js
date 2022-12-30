import { initialPlaces } from "./initialPlaces.js"

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

const placeTemplate = document.querySelector('#place').content
const placesContainer = document.querySelector('.places__list')


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


function putLike(evt) {
  evt.target.classList.toggle('place__like_active')
}


function openZoomedPicture(placeData) {
  openPopup(popupPicture)
  pictureZoomed.src = placeData.link
  pictureZoomed.alt = placeData.name
  pictureCaption.textContent = placeData.name
}


function createPlace(placeData) {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true)

  const placeButtonDelete = placeElement.querySelector('.place__delete')
  const placeButtonLike = placeElement.querySelector('.place__like')
  const placeName = placeElement.querySelector('.place__name')
  const placePicture = placeElement.querySelector('.place__image')

  placeName.textContent = placeData.name
  placePicture.src = placeData.link
  placePicture.alt = placeData.name

  placeButtonDelete.addEventListener('click', () => placeElement.remove())
  placeButtonLike.addEventListener('click', putLike)
  placePicture.addEventListener('click', () => openZoomedPicture(placeData))

  return placeElement
}


function addPlace(place, container) {
  container.prepend(place)
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
  const newPlace = createPlace(newPlaceData)
  addPlace(newPlace, placesContainer)
  closePopup(popupPlacesEditor)
  placeInputName.value = ''
  placeInputLink.value = ''

  const buttonElement = evt.submitter
  buttonElement.classList.add('popup__submit-btn_disabled')
  buttonElement.setAttribute('disabled', true)
}


function renderInitialPlaces() {
  initialPlaces.forEach(item => {
    const newPlace = createPlace(item)
    addPlace(newPlace, placesContainer)
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


renderInitialPlaces()
addEventListeners()
