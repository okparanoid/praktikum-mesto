import { Popup } from './Popup.js';

export class ImagePopup extends Popup {
  constructor(popup) {
    super();
    this.popup = popup;
    this.event = event;
  }

  open(imgUrl) {
    super.open();
    this.popup.querySelector('.popup__image').src = imgUrl;
  }
}
