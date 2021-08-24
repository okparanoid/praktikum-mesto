import { Popup } from './Popup.js';

export class AvatarPopup extends Popup {
  constructor(popup) {
    super();
    this.popup = popup;
  }

  open() {
    super.open();
    this.popup.querySelector('.popup__form').reset();
    this.popup.querySelector('.popup__button').setAttribute('disabled', true);
    this.popup.querySelector('.popup__button').classList.remove('popup__button_is-active');
    this.popup.querySelector('#user-avatar-error').textContent = '';
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup.querySelector('.popup__form').addEventListener('submit', this.close);
  }
}
