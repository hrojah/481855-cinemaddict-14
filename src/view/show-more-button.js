import {createElement} from '../utils';

const createShowMoreButtonTemplate = (text = 'Show more') => {
  return `<button class="films-list__show-more">${text}</button>`;
};

export default class ShowMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
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
