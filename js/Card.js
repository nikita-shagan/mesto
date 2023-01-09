export class Card {
  constructor(cardData, templateSelector) {
    this._link = cardData.link
    this._name = cardData.name
    this._templateSelector = templateSelector
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
  }

  createCard() {
    this._cardElement = this._createCardPattern()
    this._setCardName()
    this._handlePicture()
    this._addListeners()
    return this._cardElement
  }
}

