import { AddPopup } from './AddPopup.js';
import { Api } from './Api.js';
import { AvatarPopup } from './AvatarPopup.js';
import { Card } from './Card.js';
import { CardList } from './CardList.js';
import { EditPopup } from './EditPopup.js';
import { FormValidator } from './FormValidator.js';
import { ImagePopup } from './ImagePopup.js';
import { UserInfo} from './UserInfo.js';
import '../pages/index.css';


(function () {

  const list = document.querySelector('.places-list');
  const addButton = document.querySelector('.user-info__button');
  const editButton = document.querySelector('.user-info__edit-button');
  const formAddContainer = document.querySelector('.popup_for_place');
  const formEditContainer = document.querySelector('.popup_for_profile');
  const submitAddButton = formAddContainer.querySelector('.popup__place-button');
  const submitEditButton = formEditContainer.querySelector('.popup__profile-button');
  const formAvatarContainer = document.querySelector('.popup_for_avatar');
  const imageContainer = document.querySelector('.popup_for_image');
  const userName = document.querySelector('.user-info__name');
  const userJob = document.querySelector('.user-info__job');
  const userAvatar = document.querySelector('.user-info__photo');
  const addForm = document.forms.place;
  const editForm = document.forms.profile;
  const avatarForm = document.forms.avatar;
  const nameInput = editForm.elements.name;
  const jobInput = editForm.elements.job;
  const errorMessage = {
    empty: 'Это обязательное поле',
    wrongLength: 'Должно быть от 2 до 30 символов',
    wrongUrl: 'Здесь должна быть ссылка',
  };

  const cardlist = new CardList(list);

  const addPopup = new AddPopup(formAddContainer);
  const addFormValidator = new FormValidator(addForm, errorMessage);
  addFormValidator.setEventListeners();

  const editPopup = new EditPopup(formEditContainer);
  const userInfo = new UserInfo(nameInput, jobInput, userName, userJob, userAvatar);
  const editFormValidator = new FormValidator(editForm, errorMessage);
  editFormValidator.setEventListeners();

  const avatarPopup = new AvatarPopup(formAvatarContainer);
  const avatarFormValidator = new FormValidator(avatarForm, errorMessage);
  avatarFormValidator.setEventListeners();

  const imagePopup = new ImagePopup(imageContainer);

  const config = {
    baseUrl: process.env.NODE_ENV === 'development' ? 'http://nomoreparties.co/cohort11' : 'https://nomoreparties.co/cohort11',
    headers: {
      'authorization': 'd6aded7f-e99a-450f-9b2c-fb0bf0a44cb3',
      'Content-Type': 'application/json'
    }
  };

  const api = new Api(config);

  function userInfoLoading(isLoading) {
    if (isLoading) {
      submitEditButton.textContent = 'Загрузка...';
    } else if (!isLoading) {
      submitEditButton.textContent = 'Сохранить';
    }
  }

  function addCardLoading(isLoading) {
    if (isLoading) {
      submitAddButton.textContent = 'Загрузка...';
      submitAddButton.classList.add('popup__button_is-loading');
    } else if (!isLoading) {
      submitAddButton.textContent = '+';
      submitAddButton.classList.remove('popup__button_is-loading');
    }
  }

  const init = () => {
    api.getUserInfo()
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about);
        userInfo.setAvatar(res.avatar);
        userInfo.userId = res._id;

        api.getCards()
          .then((res) => {
            const cards = res.map(cardData => (new Card(cardData, imagePopup, api, userInfo.userId)).card);
            cardlist.render(cards);
          })
          .catch((err) => console.log(err.message))
      })
      .catch((err) => console.log(err.message))
  };

  addButton.addEventListener('click', function () {
    addPopup.open();
  });

  addForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addCardLoading(true);

    const name = addForm.elements.name;
    const link = addForm.elements.link;

    api.addCard(name.value, link.value).then(res => {
      cardlist.addCard((new Card(res, imagePopup, api, userInfo.userId)).card);
      addPopup.close();
      addCardLoading(false);
    })
      .catch(err => console.log(err))
  });

  editButton.addEventListener('click', function () {
    userInfo.updateInputs();
    editPopup.open();
  });

  editForm.addEventListener('submit', function (event) {
    event.preventDefault();
    userInfoLoading(true);

    const name = editForm.elements.name;
    const job = editForm.elements.job;

    api.changeUserInfo(name.value, job.value).then(res => {
      userInfo.setUserInfo(res.name, res.about);
      editPopup.close();
      userInfoLoading(false);
    })
      .catch(err => console.log(err))
  });

  userAvatar.addEventListener('click', function () {
    avatarPopup.open();
  });

  avatarForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const avatarUrl = avatarForm.elements.avatar;

    api.changeUserAvatar(avatarUrl.value).then(res => {
      userInfo.setAvatar(res.avatar);
    })
      .catch(err => console.log(err));
  });

  init();

}());

