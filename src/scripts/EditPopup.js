import { Popup } from './Popup.js';

export class EditPopup extends Popup {
  constructor(popup) {
    super();
    this.popup = popup;
  }

  open() {
    super.open();
    this.popup.querySelector('.popup__button').removeAttribute('disabled');
    this.popup.querySelector('.popup__button').classList.add('popup__button_is-active');
    this.popup.querySelector('#user-name-error').textContent = '';
    this.popup.querySelector('#about-error').textContent = '';
  }
}
