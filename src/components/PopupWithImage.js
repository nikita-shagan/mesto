import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(imagePopupSelector) {
    super(imagePopupSelector);
    this._pictureZoomed = document.querySelector('.zoomed-picture__image')
    this._pictureCaption = document.querySelector('.zoomed-picture__caption')
  }

  open({placeName, placeLink}) {
    super.open();
    this._pictureZoomed.src = placeLink
    this._pictureCaption.textContent = placeName
    this._pictureZoomed.alt = placeName
  }
}
