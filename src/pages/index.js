import './index.css';
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupDeleteCard from "../components/PopupDeleteCard";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo";
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Api from "../components/Api";
import {
  popupProfileEditorSelector,
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  popupProfileOpenButton,
  popupPlacesEditorSelector,
  popupPlacesOpenButton,
  popupPictureSelector,
  placesContainerSelector,
  popupDeleteSelector,
  popupAvatarSelector,
  popupAvatarOpenButton,
  formSetup
} from '../utils/constants.js'


const openPopupProfile = () => {
  const userInfo = user.getUserInfo()
  popupProfileEditor.setInputValues(userInfo)
  formValidators['profileEditing'].resetValidation()
  popupProfileEditor.open()
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
    .then(() => popupProfileEditor.close())
    .catch(err => {
      console.log(err)
      alert(`Не удалось обновить профиль, ${err}`)
    })
    .finally(() => popupProfileEditor.hideLoading())
}


const handleFormSubmitPlaces = (evt, newPlaceData) => {
  popupPlacesEditor.showLoading()
  evt.preventDefault()
  api.addCard(newPlaceData)
    .then(res => cardRenderer.addItemToStart(res))
    .then(() => popupPlacesEditor.close())
    .catch(err => {
      console.log(err)
      alert(`Не удалось добавить карточку, ${err}`)
    })
    .finally(() => popupPlacesEditor.hideLoading())
}

const handleFormSubmitCardDelete = (evt, cardObject) => {
  evt.preventDefault()
  api.deleteCard(cardObject.getCardId())
    .then(() => cardObject.removeCard())
    .then(() => popupDeleteCard.close())
    .catch(err => {
      console.log(err)
      alert(`Не удалось выполнить удаление, ${err}`)
    })
}

const handleFormSubmitAvatarChanging = (evt, {link}) => {
  popupAvatar.showLoading()
  evt.preventDefault()
  api.changeAvatar(link)
    .then(res => user.setUserInfo(res))
    .then(() => popupAvatar.close())
    .catch(err => {
      console.log(err)
      alert(`Не удалось изменить картинку, ${err}`)
    })
    .finally(() => popupAvatar.hideLoading())
}


const cardRenderer = new Section({
  renderer: (placeData) => {
    const placeElement = new Card({
      cardData: placeData,
      templateSelector: '#place',
      userInfo: user.getUserInfo(),
      handleCardClick: () => popupPicture.open(placeData),
      handleDeleteClick: (cardObject) => {
        popupDeleteCard.open()
        popupDeleteCard.setCardObject(cardObject)
      },
      handleLikeClick: (likePressed, cardId) => {
        api.toggleLike(likePressed, cardId)
          .then(res => {
            placeElement.setLikes(res.likes)
          })
          .catch(err => {
            console.log(err)
            alert(err)
          })
      }
    })
    return placeElement.createCard()
  }
}, placesContainerSelector)


const user = new UserInfo({
  nameElementSelector: profileNameSelector,
  aboutElementSelector: profileAboutSelector,
  avatarElementSelector: profileAvatarSelector
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


const popupDeleteCard = new PopupDeleteCard({
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


api.getUserInfo()
  .then(res => {
    user.setUserInfo(res)
  })
  .then(() => {
    api.getInitialCards()
      .then(res => cardRenderer.renderItems(res))
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))

enableValidation(formSetup)

popupAvatarOpenButton.addEventListener('click', () => popupAvatar.open())
popupPlacesOpenButton.addEventListener('click', openPopupPlaces)
popupProfileOpenButton.addEventListener('click', openPopupProfile)
