export class CardList {
  constructor(container) {
    this.container = container;
  }

  addCard(card) {
    this.container.prepend(card);
  }

  render(cards) {
    cards.forEach((card) => {
      if (card.classList.contains('my-card')) {
        this.addCard(card);
      }
      if (!card.classList.contains('my-card')) {
        this.container.append(card);
      }
    })
  }
}
