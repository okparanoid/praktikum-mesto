export class Api {
  constructor(config) {
    this.url = config.baseUrl;
    this.headers = config.headers;
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  changeUserInfo(nameText, aboutText) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: nameText,
        about: aboutText,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  changeUserAvatar(avatarUrl) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  addCard(cardName, cardLink) {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      headers: this.headers,
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  addLike(id) {
    return fetch(`${this.url}/cards/like/${id}`, {
      headers: this.headers,
      method: 'PUT',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteLike(id) {
    return fetch(`${this.url}/cards/like/${id}`, {
      headers: this.headers,
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}
