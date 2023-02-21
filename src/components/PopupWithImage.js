import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(imagePopupSelector) {
    super(imagePopupSelector);
    this._pictureZoomed = document.querySelector('.zoomed-picture__image')
    this._pictureCaption = document.querySelector('.zoomed-picture__caption')
  }

  open({name, link}) {
    this._pictureZoomed.src = link
    this._pictureCaption.textContent = name
    this._pictureZoomed.alt = name
    super.open();
  }
}
