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

  _putLike(evt) {
    evt.target.classList.toggle('place__like_active')
  }

  _setCardName() {
    const cardName = this._cardElement.querySelector('.place__name')
    cardName.textContent = this._name
  }

  _handlePicture() {
    const cardPicture = this._cardElement.querySelector('.place__image')
    cardPicture.src = this._link
    cardPicture.alt = this._name
  }

  _addListeners() {
    const cardButtonLike = this._cardElement.querySelector('.place__like')
    const cardButtonDelete = this._cardElement.querySelector('.place__delete')
    cardButtonLike.addEventListener('click', this._putLike)
    cardButtonDelete.addEventListener('click', () => this._cardElement.remove())
    this._cardElement.addEventListener('click', (evt) => {
      if (evt.target !== cardButtonLike && evt.target !== cardButtonDelete) {
        this._handleCardClick()
      }
    })
  }

  createCard() {
    this._cardElement = this._createCardPattern()
    this._setCardName()
    this._handlePicture()
    this._addListeners()
    return this._cardElement
  }
}

