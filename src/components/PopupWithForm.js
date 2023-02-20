import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, formSelector, handleFormSubmit}) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(formSelector)
    this._handleFormSubmit = handleFormSubmit
    this.formInputsList = Array.from(this._formElement.querySelectorAll('input'))
    this._submitButtom = this._formElement.querySelector('.popup__submit-btn')
    this._initialSubmitButtonText = this._submitButtom.textContent
  }

  _getInputValues() {
    const inputValues = {}
    this.formInputsList.forEach(input => {
      inputValues[input.name] = input.value
    })
    return inputValues
  }

  setInputValues(data) {
    this.formInputsList.forEach(input => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners()
    this._formElement.addEventListener('submit', (evt) => {
      const inputValues = this._getInputValues()
      this._handleFormSubmit(evt, inputValues)
    })
  }

  showLoading() {
    this._submitButtom.textContent = 'Сохранение...'
  }

  hideLoading() {
    this._submitButtom.textContent = this._initialSubmitButtonText
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
