export class Card {
  constructor(cardData, openImageCallback, api, userId) {
    this.cardData = cardData;
    this.api = api;
    this.userId = userId;
    this.name = cardData.name;
    this.link = cardData.link;
    this.likes = cardData.likes;
    this.owner = cardData.owner;
    this.openImage = this.openImage.bind(this);
    this.remove = this.remove.bind(this);
    this.like = this.like.bind(this);
    this.card = this.create();
    this.openImageCallback = openImageCallback;
  }

  create() {
    const markup = `
      <div class="place-card">
      <div class="place-card__image">
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <div class="place-card__likes">
          <button class="place-card__like-icon"></button>
          <span class="place-card__like"></span>
        </div>
      </div>
      </div>
    `;

    this.card = document.createElement('div');
    this.card.insertAdjacentHTML('afterbegin', markup);

    this.card.querySelector('.place-card__name').textContent = this.name;
    this.card.querySelector('.place-card__image').style.backgroundImage = `url(${this.link})`;
    this.card.querySelector('.place-card__like').textContent = this.likes.length;

    this.cardValidate();

    this.setEventListeners();

    return this.card.firstElementChild;
  }

  cardValidate() {
    if (this.owner._id == this.userId) {
      const buttonTemplate = `<button class="place-card__delete-icon"></button>`
      this.card.querySelector('.place-card__image').insertAdjacentHTML('afterbegin', buttonTemplate);
      this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
      this.card.querySelector('.place-card').classList.add('my-card');
    }

    if (this.likes.find(item => item._id == this.userId)) {
      this.card.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
    }
  }

  setEventListeners() {
    this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.card.querySelector('.place-card__image').addEventListener('click', this.openImage);
  }

  openImage(event) {
    if (event.target.classList.contains('place-card__image')) {
      this.openImageCallback.open(this.link);
    }
  }

  likeHandler(elem, res) {
    elem.classList.toggle('place-card__like-icon_liked');
    elem.parentNode.querySelector('.place-card__like').textContent = res.likes.length;
  }

  like(event) {
    const likeButton = event.target;
    const check = likeButton.classList.contains('place-card__like-icon_liked');

    if (check) {
      this.api.deleteLike(this.cardData._id)
        .then((res) => {
          this.likeHandler(likeButton, res);
        })
        .catch(err => console.log(err));
    }

    if (!check) {
      this.api.addLike(this.cardData._id)
        .then((res) => {
          this.likeHandler(likeButton, res);
        })
        .catch(err => console.log(err));
    }
  }

  remove(event) {
    const card = event.target.closest('.place-card');

    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
      this.api.deleteCard(this.cardData._id)
        .then(() => {
          card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
          card.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
          card.querySelector('.place-card__image').addEventListener('click', this.openImage);
          card.remove();
        })
        .catch(err => console.log(err));
    }
  }
}
