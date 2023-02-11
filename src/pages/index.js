import './index.css';
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo";
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import { initialPlaces } from "../utils/initialPlaces.js"
import {popupProfileEditorSelector,
  profileNameSelector,
  profileAboutSelector,
  popupProfileOpenButton,
  popupPlacesEditorSelector,
  popupPlacesOpenButton,
  popupPictureSelector,
  placesContainerSelector,
  formSetup
} from '../utils/constants.js'


const openPopupProfile = () => {
  formValidators['profileEditing'].resetValidation()
  popupProfileEditor.open()
  const userInfo = user.getUserInfo()
  popupProfileEditor.setInputValues(userInfo)
}


const openPopupPlaces = () => {
  formValidators['placeAdding'].resetValidation()
  popupPlacesEditor.open()
}


const handleFormSubmitProfile = (evt, newInputData) => {
  evt.preventDefault()
  user.setUserInfo(newInputData)
}


const handleFormSubmitPlaces = (evt, newPlaceData) => {
  evt.preventDefault()
  cardRenderer.addItem(newPlaceData)
}


const formValidators = {}
const enableValidation = (formSetup) => {
  const formsList = Array.from(document.querySelectorAll(formSetup.formSelector))
  formsList.forEach((formElement) => {
    const validator = new FormValidator(formSetup, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};


const cardRenderer = new Section({
  items: initialPlaces,
  renderer: (placeData) => {
    const placeElement = new Card(placeData, '#place', () => popupPicture.open(placeData))
    return placeElement.createCard()
  }
}, placesContainerSelector)


const popupPicture = new PopupWithImage(popupPictureSelector)


const popupProfileEditor = new PopupWithForm({
  popupSelector: popupProfileEditorSelector,
  formSelector: formSetup.formSelector,
  handleFormSubmit: handleFormSubmitProfile
})


const popupPlacesEditor = new PopupWithForm({
  popupSelector: popupPlacesEditorSelector,
  formSelector: formSetup.formSelector,
  handleFormSubmit: handleFormSubmitPlaces
})


const user = new UserInfo({
  nameElementSelector: profileNameSelector,
  aboutElementSelector: profileAboutSelector
})


popupPicture.setEventListeners()
popupProfileEditor.setEventListeners()
popupPlacesEditor.setEventListeners()
cardRenderer.renderItems()
enableValidation(formSetup)

popupPlacesOpenButton.addEventListener('click', openPopupPlaces)
popupProfileOpenButton.addEventListener('click', openPopupProfile)
