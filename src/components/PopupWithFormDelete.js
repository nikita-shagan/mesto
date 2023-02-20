import PopupWithForm from "./PopupWithForm.js";

export default class PopupWithFormDelete extends PopupWithForm {
  constructor({popupSelector, formSelector, handleFormSubmit}) {
    super({popupSelector, formSelector, handleFormSubmit});
  }

  setCardId(id) {
    this._cardId = id
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleButtonClose.bind(this))
    this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this))
    this._formElement.addEventListener('submit', (evt) => {
      this._handleFormSubmit(evt, this._cardId)
      this.close()
    })
  }
}
