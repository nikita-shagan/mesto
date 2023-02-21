export default class Card {
  constructor({cardData, userInfo, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick}) {
    this._link = cardData.link
    this._name = cardData.name
    this._likes = cardData.likes
    this._cardOwnerId =cardData.owner._id
    this._cardId = cardData._id
    this._iAmOwner = this._cardOwnerId === userInfo._id
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._handleDeleteClick = handleDeleteClick
    this._handleLikeClick = handleLikeClick
  }

  _createCardPattern() {
    const cardTemplate = document.querySelector(this._templateSelector).content
    return cardTemplate.querySelector('.place').cloneNode(true)
  }

  _setCardName() {
    this._cardName.textContent = this._name
  }

  _handlePicture() {
    this._cardPicture.src = this._link
    this._cardPicture.alt = this._name
  }

  _addListeners() {
    this._cardButtonLike.addEventListener('click', () => this._handleLikeClick(this._likeOnServerPressed, this._cardId))
    this._cardButtonDelete.addEventListener('click', () => this._handleDeleteClick(this))
    this._cardPicture.addEventListener('click', () => this._handleCardClick())
  }

  _toggleLike() {
    if (this._likeOnServerPressed) {
      this._cardButtonLike.classList.add('place__like_active')
    } else {
      this._cardButtonLike.classList.remove('place__like_active')
    }
  }

  setLikes(likes) {
    this._likes = likes
    this._likesCounter.textContent = this._likes.length.toString()
    this._likeOnServerPressed = this._likes.some(like => {
      return like._id === '427dd20c1ef237217ab5be35'
    })
    this._toggleLike()
  }

  _removeDeleteButton() {
    this._cardButtonDelete.remove()
  }

  getCardId() {
    return this._cardId
  }

  createCard() {
    this._cardElement = this._createCardPattern()
    this._likesCounter = this._cardElement.querySelector('.place__likes-counter')
    this._cardName = this._cardElement.querySelector('.place__name')
    this._cardPicture = this._cardElement.querySelector('.place__image')
    this._cardButtonLike = this._cardElement.querySelector('.place__like')
    this._cardButtonDelete = this._cardElement.querySelector('.place__delete')
    this._setCardName()
    this._handlePicture()
    this._addListeners()
    this.setLikes(this._likes)
    if (!this._iAmOwner) {
      this._removeDeleteButton()
    }
    return this._cardElement
  }

  removeCard() {
    this._cardElement.remove()
  }
}

