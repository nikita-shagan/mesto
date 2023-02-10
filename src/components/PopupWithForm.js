import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, formSelector, handleFormSubmit}) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(formSelector)
    this._handleFormSubmit = handleFormSubmit
    this.formInputsList = Array.from(this._formElement.querySelectorAll('input'))
  }

  _getInputValues() {
    const inputValues = {}
    this.formInputsList.forEach(input => {
      inputValues[input.name] = input.value
    })
    return inputValues
  }

  setInputValues(data) {
    this.formInputsList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners()
    this._formElement.addEventListener('submit', (evt) => {
      const inputValues = this._getInputValues()
      this._handleFormSubmit(evt, inputValues)
      this.close()
    })
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
