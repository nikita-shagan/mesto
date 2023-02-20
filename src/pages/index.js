import './index.css';
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithFormDelete from "../components/PopupWithFormDelete";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo";
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Api from "../components/Api";
import {
  popupProfileEditorSelector,
  profileNameSelector,
  profileAboutSelector,
  popupProfileOpenButton,
  popupPlacesEditorSelector,
  popupPlacesOpenButton,
  popupPictureSelector,
  placesContainerSelector,
  popupDeleteSelector,
  popupAvatarSelector,
  popupAvatarOpenButton,
  profileAvatar,
  formSetup
} from '../utils/constants.js'


const openPopupProfile = () => {
  popupProfileEditor.open()
  const userInfo = user.getUserInfo()
  popupProfileEditor.setInputValues(userInfo)
  formValidators['profileEditing'].resetValidation()
}


const openPopupPlaces = () => {
  formValidators['placeAdding'].resetValidation()
  popupPlacesEditor.open()
}


const handleFormSubmitProfile = (evt, newInputData) => {
  popupProfileEditor.showLoading()
  evt.preventDefault()
  api.updateUserInfo(newInputData)
    .then(res => user.setUserInfo(res))
    .catch(err => console.log(err))
    .finally(() => {
      popupProfileEditor.close()
      popupProfileEditor.hideLoading()
    })
}


const handleFormSubmitPlaces = (evt, newPlaceData) => {
  popupPlacesEditor.showLoading()
  evt.preventDefault()
  api.addCard(newPlaceData)
    .then(res => cardRenderer.addItem(res))
    .catch(err => console.log(err))
    .finally(() => {
      popupPlacesEditor.close()
      popupPlacesEditor.hideLoading()
    })
}

const handleFormSubmitCardDelete = (evt, cardId) => {
  evt.preventDefault()
  api.deleteCard(cardId)
    .then(() => document.getElementById(cardId).remove())
    .catch(err => console.log(err))
}

const handleFormSubmitAvatarChanging = (evt, {link}) => {
  popupAvatar.showLoading()
  evt.preventDefault()
  api.changeAvatar(link)
    .then(res => {
      profileAvatar.src = res.avatar
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupAvatar.close()
      popupAvatar.hideLoading()
    })
}


const cardRenderer = new Section({
  renderer: (placeData) => {
    const placeElement = new Card({
      cardData: placeData,
      templateSelector: '#place',
      handleCardClick: () => popupPicture.open(placeData),
      handleDeleteClick: (cardId) => {
        popupDeleteCard.open()
        popupDeleteCard.setCardId(cardId)
      },
      handleLikeClick: (likePressed, cardId) => {
        api.toggleLike(likePressed, cardId)
          .then(res => {
            placeElement.setLikes(res.likes)
          })
          .catch(err => console.log(err))
      }
    })
    const card = placeElement.createCard()
    if (placeData.owner._id !== '427dd20c1ef237217ab5be35') {
      placeElement.removeDeleteButton()
    }
    return card
  }
}, placesContainerSelector)


const user = new UserInfo({
  nameElementSelector: profileNameSelector,
  aboutElementSelector: profileAboutSelector
})


const formValidators = {}
const enableValidation = (formSetup) => {
  const formsList = Array.from(document.querySelectorAll(formSetup.formSelector))
  formsList.forEach((formElement) => {
    const validator = new FormValidator(formSetup, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator
    validator.enableValidation()
  });
};


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '7b8d3e4a-b3ad-460d-aa9f-12a0d80fc5f5',
    'Content-Type': 'application/json'
  }
})


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


const popupDeleteCard = new PopupWithFormDelete({
  popupSelector: popupDeleteSelector,
  formSelector: formSetup.formSelector,
  handleFormSubmit: handleFormSubmitCardDelete
})

const popupAvatar = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  formSelector: formSetup.formSelector,
  handleFormSubmit: handleFormSubmitAvatarChanging
})


popupPlacesEditor.setEventListeners()
popupDeleteCard.setEventListeners()
popupPicture.setEventListeners()
popupProfileEditor.setEventListeners()
popupAvatar.setEventListeners()

api.getInitialCards()
  .then(res => cardRenderer.renderItems(res.reverse()))
  .catch(err => console.log(err))

api.getUserInfo()
  .then(res => {
    user.setUserInfo(res)
    profileAvatar.src = res.avatar
  })
  .catch(err => console.log(err))

enableValidation(formSetup)

popupAvatarOpenButton.addEventListener('click', () => popupAvatar.open())
popupPlacesOpenButton.addEventListener('click', openPopupPlaces)
popupProfileOpenButton.addEventListener('click', openPopupProfile)
