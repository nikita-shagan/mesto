export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._link = cardData.placeLink
    this._name = cardData.placeName
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
  }

  _createCardPattern() {
    const cardTemplate = document.querySelector(this._templateSelector).content
    return cardTemplate.querySelector('.place').cloneNode(true)
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('place__like_active')
  }

  _setCardName() {
    this._cardName.textContent = this._name
  }

  _handlePicture() {
    this._cardPicture.src = this._link
    this._cardPicture.alt = this._name
  }

  _addListeners() {
    this._cardButtonLike.addEventListener('click', this._toggleLike)
    this._cardButtonDelete.addEventListener('click', () => this._cardElement.remove())
    this._cardPicture.addEventListener('click', () => this._handleCardClick())
  }

  createCard() {
    this._cardElement = this._createCardPattern()
    this._cardName = this._cardElement.querySelector('.place__name')
    this._cardPicture = this._cardElement.querySelector('.place__image')
    this._cardButtonLike = this._cardElement.querySelector('.place__like')
    this._cardButtonDelete = this._cardElement.querySelector('.place__delete')
    this._setCardName()
    this._handlePicture()
    this._addListeners()
    return this._cardElement
  }
}

