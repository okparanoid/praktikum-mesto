import { Popup } from './Popup.js';

export class AddPopup extends Popup {
  constructor(popup) {
    super();
    this.popup = popup;
  }

  open() {
    super.open();
    this.popup.querySelector('.popup__form').reset();
    this.popup.querySelector('.popup__button').setAttribute('disabled', true);
    this.popup.querySelector('.popup__button').classList.remove('popup__button_is-active');
    this.popup.querySelector('#name-card-error').textContent = '';
    this.popup.querySelector('#link-error').textContent = '';
  }
}
