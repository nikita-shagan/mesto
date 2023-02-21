import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor({popupSelector, formSelector, handleFormSubmit}) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(formSelector)
    this._handleFormSubmit = handleFormSubmit
  }

  setCardObject(card) {
    this._cardObject = card
  }

  setEventListeners() {
    super.setEventListeners()
    this._formElement.addEventListener('submit', (evt) => {
      this._handleFormSubmit(evt, this._cardObject)
    })
  }
}
