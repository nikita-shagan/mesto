import { initialPlaces } from "./initialPlaces.js"

const popupProfileEditor = document.querySelector('.popup_sort_profile')
const popupPlacesEditor = document.querySelector('.popup_sort_place')
const popupPicture = document.querySelector('.popup_sort_picture')
const popups = document.querySelectorAll('.popup')
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

const placesList = document.querySelector('.places__list')

let currentPopup


function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(currentPopup);
  }
}


function openPopup(popup) {
  popup.classList.add('popup_opened')
  currentPopup = popup
  document.addEventListener('keydown', closePopupByEscape)
}


function renderPopupProfile() {
  inputName.value = profileName.textContent
  inputAbout.value = profileAbout.textContent
}


function openPopupProfile() {
  openPopup(popupProfileEditor)
  renderPopupProfile()
}


function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByEscape)
}


function putLike(evt) {
  evt.target.classList.toggle('place__like_active')
}


function openZoomedPicture(name, link) {
  const pictureZoomed = document.querySelector('.zoomed-picture__image')
  const pictureCaption = document.querySelector('.zoomed-picture__caption')
  openPopup(popupPicture)
  pictureZoomed.src = link
  pictureZoomed.alt = name
  pictureCaption.textContent = name
}


function createPlace(name, link) {
  const placeTemplate = document.querySelector('#place').content
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true)

  const placeButtonDelete = placeElement.querySelector('.place__delete')
  const placeButtonLike = placeElement.querySelector('.place__like')
  const placeName = placeElement.querySelector('.place__name')
  const placePicture = placeElement.querySelector('.place__image')

  placeName.textContent = name
  placePicture.src = link
  placePicture.alt = name

  placeButtonDelete.addEventListener('click', () => placeElement.remove())
  placeButtonLike.addEventListener('click', putLike)
  placePicture.addEventListener('click', () => openZoomedPicture(name, link))

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
  const placeNew = createPlace(placeInputName.value, placeInputLink.value)
  addPlace(placeNew, placesList)
  closePopup(popupPlacesEditor)
  placeInputName.value = ''
  placeInputLink.value = ''
}


function renderInitialPlaces() {
  initialPlaces.forEach(item => {
    const placeNew = createPlace(item.name, item.link)
    addPlace(placeNew, placesList)
  })
}


function addEventListeners() {
  formProfileElement.addEventListener('submit', handleFormSubmitProfile)
  formPlacesElement.addEventListener('submit', handleFormSubmitPlaces)

  popupProfileOpenButton.addEventListener('click', openPopupProfile)
  popupPlacesOpenButton.addEventListener('click', () => openPopup(popupPlacesEditor))

  popups.forEach(popup => {
    popup.addEventListener('click', evt => {
      if (Array.from(evt.target.classList).includes('popup__close') || evt.target === evt.currentTarget) {
        closePopup(popup)
      }
    })
  })
}


renderInitialPlaces()
addEventListeners()
