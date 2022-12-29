function isValid(inputElement) {
  return inputElement.validity.valid
}


function hasInvalidInput(inputsList) {
  return inputsList.some(inputElement => {
    return !isValid(inputElement)
  })
}


function buttonToggle(inputsList, buttonElement, classesObj) {
  if (hasInvalidInput(inputsList)) {
    buttonElement.classList.add(classesObj.inactiveButtonClass)
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove(classesObj.inactiveButtonClass)
    buttonElement.removeAttribute('disabled')
  }
}


function showError(inputElement, errorElement, classesObj) {
  inputElement.classList.add(classesObj.inputErrorClass)
  errorElement.textContent = inputElement.validationMessage
}


function hideError(inputElement, errorElement, classesObj) {
  inputElement.classList.remove(classesObj.inputErrorClass)
  errorElement.textContent = ''
}


function validateInput(inputElement, formElement, classesObj) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`)
  if (!isValid(inputElement)) {
    showError(inputElement, errorElement, classesObj)
  } else {
    hideError(inputElement, errorElement, classesObj)
  }
}


function setEventListeners(formElement, classesObj) {
  const inputsList = Array.from(formElement.querySelectorAll(classesObj.inputSelector))
  const buttonElement = formElement.querySelector(classesObj.submitButtonSelector)
  buttonToggle(inputsList, buttonElement, classesObj)
  inputsList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      validateInput(inputElement, formElement, classesObj)
      buttonToggle(inputsList, buttonElement, classesObj)
    })
  })
}


function enableValidation(classesObj) {
  const formsList = Array.from(document.querySelectorAll(classesObj.formSelector))
  formsList.forEach(formElement => {
    setEventListeners(formElement, classesObj)
  })
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
});
