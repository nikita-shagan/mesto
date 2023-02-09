import './pages/index.css';
import Section from "./components/Section";
import PopupWithForm from "./components/PopupWithForm";
import PopupWithImage from "./components/PopupWithImage";
import UserInfo from "./components/UserInfo";
import Card from './components/Card.js'
import FormValidator from './components/FormValidator.js'
import { initialPlaces } from "./utils/initialPlaces.js"
import {popupProfileEditorSelector,
  profileNameSelector,
  profileAboutSelector,
  formProfileElement,
  inputProfileName,
  inputProfileAbout,
  popupProfileOpenButton,
  popupPlacesEditorSelector,
  formPlacesElement,
  popupPlacesOpenButton,
  popupPictureSelector,
  placesContainerSelector,
  formSetup
} from './utils/constants.js'


const openPopupProfile = () => {
  popupProfileEditor.open()
  const userInfo = user.getUserInfo()
  inputProfileName.value = userInfo.profileName
  inputProfileAbout.value = userInfo.profileAbout
  formProfileValidator.resetValidation()
}


const createPlaceCard = (placeData) => {
  const popupPicture = new PopupWithImage(popupPictureSelector, placeData)
  popupPicture.setEventListeners()
  const placeElement = new Card(placeData, '#place', () => popupPicture.open())
  return placeElement.createCard()
}


const handleFormSubmitProfile = (evt, newInputData) => {
  evt.preventDefault()
  user.setUserInfo(newInputData)
}


const handleFormSubmitPlaces = (evt, newPlaceData) => {
  evt.preventDefault()
  const newPlaceCard = createPlaceCard(newPlaceData)
  cardRenderer.addItem(newPlaceCard)
  formPlacesValidator.resetValidation()
}


const cardRenderer = new Section({
  items: initialPlaces,
  renderer: (placeData) => {
    const newPlaceCard = createPlaceCard(placeData)
    cardRenderer.addItem(newPlaceCard)
  }
}, placesContainerSelector)


const popupProfileEditor = new PopupWithForm({
  popupSelector: popupProfileEditorSelector,
  formElement: formProfileElement,
  handleFormSubmit: handleFormSubmitProfile
})


const popupPlacesEditor = new PopupWithForm({
  popupSelector: popupPlacesEditorSelector,
  formElement: formPlacesElement,
  handleFormSubmit: handleFormSubmitPlaces
})


const user = new UserInfo({
  nameElementSelector: profileNameSelector,
  aboutElementSelector: profileAboutSelector
})


const formProfileValidator = new FormValidator(formSetup, formProfileElement)
const formPlacesValidator = new FormValidator(formSetup, formPlacesElement)

cardRenderer.renderItems()
popupProfileEditor.setEventListeners()
popupPlacesEditor.setEventListeners()
formProfileValidator.enableValidation()
formPlacesValidator.enableValidation()
popupPlacesOpenButton.addEventListener('click', () => popupPlacesEditor.open())
popupProfileOpenButton.addEventListener('click', openPopupProfile)
