export class FormValidator {
  constructor (classesObj, formElement) {
    this._formElement = formElement
    this._formSelector = classesObj.formSelector
    this._inputSelector = classesObj.inputSelector
    this._submitButtonSelector = classesObj.submitButtonSelector
    this._inactiveButtonClass = classesObj.inactiveButtonClass
    this._inputErrorClass = classesObj.inputErrorClass
  }

  _isValid(inputElement) {
    return inputElement.validity.valid
  }


  _hasInvalidInput(inputsList) {
    return inputsList.some(inputElement => {
      return !this._isValid(inputElement)
    })
  }


  _buttonToggle(inputsList, buttonElement) {
    if (this._hasInvalidInput(inputsList)) {
      buttonElement.classList.add(this._inactiveButtonClass)
      buttonElement.setAttribute('disabled', true)
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass)
      buttonElement.removeAttribute('disabled')
    }
  }


  _showError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-input-error`)
    inputElement.classList.add(this._inputErrorClass)
    errorElement.textContent = inputElement.validationMessage
  }


  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-input-error`)
    inputElement.classList.remove(this._inputErrorClass)
    errorElement.textContent = ''
  }


  _validateInput(inputElement) {
    if (!this._isValid(inputElement)) {
      this._showError(inputElement)
    } else {
      this._hideError(inputElement)
    }
  }


  enableValidation() {
    const inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector)
    this._buttonToggle(inputsList, buttonElement)
    inputsList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._validateInput(inputElement)
        this._buttonToggle(inputsList, buttonElement)
      })
    })
  }
}
