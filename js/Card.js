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

  _setCardName(cardElement) {
    const cardName = cardElement.querySelector('.place__name')
    cardName.textContent = this._name
  }

  _handleCardRemoving(cardElement) {
    const cardButtonDelete = cardElement.querySelector('.place__delete')
    cardButtonDelete.addEventListener('click', () => cardElement.remove())
  }

  _handleLike(cardElement) {
    const cardButtonLike = cardElement.querySelector('.place__like')
    cardButtonLike.addEventListener('click', this._putLike)
  }

  _handlePicture(cardElement) {
    const cardPicture = cardElement.querySelector('.place__image')
    cardPicture.src = this._link
    cardPicture.alt = this._name
  }

  createCard() {
    const cardElement = this._createCardPattern()

    this._setCardName(cardElement)
    this._handleCardRemoving(cardElement)
    this._handleLike(cardElement)
    this._handlePicture(cardElement)

    return cardElement
  }
}

