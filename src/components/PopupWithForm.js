import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, formElement, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit
    this._formElement = formElement
  }

  _getInputValues() {
    const formInputs = Array.from(this._formElement.querySelectorAll('input'))
    const inputValues = {}
    formInputs.forEach(input => {
      inputValues[input.name] = input.value
    })
    return inputValues
  }
  setEventListeners() {
    super.setEventListeners()
    this._formElement.addEventListener('submit', (evt) => {
      const inputValues = this._getInputValues()
      this.close()
      this._handleFormSubmit(evt, inputValues)
    })
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
