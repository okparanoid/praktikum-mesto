export class FormValidator {
  constructor(form, error) {
    this.form = form;
    this.error = error;
    this.setSubmitButtonState = this.setSubmitButtonState.bind(this);
    this.checkInputValidity = this.checkInputValidity.bind(this);
  }

  checkInputValidity(input) {
    input.setCustomValidity('');

    if (input.validity.valueMissing) {
      input.setCustomValidity(this.error.empty);
      return false
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this.error.wrongLength);
      return false
    }

    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity(this.error.wrongUrl);
      return false
    }

    return input.checkValidity();
  }

  isFieldValid(input) {
    const errorElem = this.form.querySelector(`#${input.id}-error`);
    errorElem.textContent = input.validationMessage;
    return this.checkInputValidity(input);
  }

  setSubmitButtonState(event) {
    const submit = event.currentTarget.querySelector('.button');
    const [...inputs] = event.currentTarget.elements;
    this.isFieldValid(event.target);
    const check = inputs.every(this.checkInputValidity);
    if (check) {
      submit.removeAttribute('disabled');
      submit.classList.add('popup__button_is-active');
    } else {
      submit.setAttribute('disabled', true);
      submit.classList.remove('popup__button_is-active');
    }
    this.isFieldValid(event.target);
  }

  setEventListeners() {
    this.form.addEventListener('input', this.setSubmitButtonState);
  }
}
