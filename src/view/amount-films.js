import {createElement} from '../utils';

const createAmountFilmsTemplate = (text = '130 291 movies inside') => {
  return `<p>${text}</p>`;
};

export default class AmountFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createAmountFilmsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
