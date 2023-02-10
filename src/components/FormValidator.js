export default class FormValidator {
  constructor (classesObj, formElement) {
    this._formElement = formElement
    this._inputSelector = classesObj.inputSelector
    this._submitButtonSelector = classesObj.submitButtonSelector
    this._inactiveButtonClass = classesObj.inactiveButtonClass
    this._inputErrorClass = classesObj.inputErrorClass
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
  }

  _isValid(inputElement) {
    return inputElement.validity.valid
  }

  _hasInvalidInput(inputsList) {
    return inputsList.some(inputElement => {
      return !this._isValid(inputElement)
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputsList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass)
      this._buttonElement.setAttribute('disabled', true)
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass)
      this._buttonElement.removeAttribute('disabled')
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
    this._toggleButtonState()
    this._inputsList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._validateInput(inputElement)
        this._toggleButtonState()
      })
    })
  }

  resetValidation() {
    this._toggleButtonState()
    this._inputsList.forEach(inputElement => {
      this._hideError(inputElement)
    })
  }
}
