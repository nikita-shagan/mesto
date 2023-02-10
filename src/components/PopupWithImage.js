import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(imagePopupSelector, handleImage) {
    super(imagePopupSelector);
    this._handleImage = handleImage
  }

  open({placeName, placeLink}) {
    super.open();
    this._handleImage(placeName, placeLink)
  }
}
