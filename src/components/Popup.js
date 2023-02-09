export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close()
    }
  }

  _handleButtonClose(evt) {
    if (evt.target.classList.contains('popup__close')) {
      this.close()
    }
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose.bind(this))
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose.bind(this))
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleButtonClose.bind(this))
    this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this))
  }
}
