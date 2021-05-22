import Abstract from './abstract';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._film = {};
  }

  updateData(update) {
    if (!update) {
      return;
    }

    this._film = Object.assign(
      {},
      this._film,
      update,
    );

    this.updateElement();
  }

  updateDate(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    const scroll = prevElement.scrollTop;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    newElement.scrollTop = scroll;
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
