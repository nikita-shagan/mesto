import Popup from './Popup.js'
import {pictureCaption, pictureZoomed} from "../utils/constants";

export default class PopupWithImage extends Popup {
  constructor(imagePopupSelector, {placeName, placeLink}) {
    super(imagePopupSelector);
    this._name = placeName
    this._link = placeLink
  }

  open() {
    super.open();
    pictureZoomed.src = this._link
    pictureZoomed.alt = this._name
    pictureCaption.textContent = this._name
  }
}
