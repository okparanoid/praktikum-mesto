export class Popup {
  constructor(popup) {
    this.popup = popup;
    this.close = this.close.bind(this);
  }

  open() {
    this.popup.classList.add('popup_is-opened');
    this.setEventListeners();
  }

  setEventListeners() {
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
  }

  removeEventListeners() {
    this.popup.querySelector('.popup__close').removeEventListener('click', this.close);
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
    this.removeEventListeners();
  }
}

