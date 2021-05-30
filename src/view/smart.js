import Abstract from './abstract';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._film = {};
  }

  deleteComment(update) {
    if (!update) {
      return;
    }

    update.isDelete = true;
  }

  errorDeleteComment(update) {
    if (!update) {
      return;
    }

    update.isDelete = false;
    this.updateElement();
  }

  addComment() {
    this._film = Object.assign(
      {},
      this._film,
      {
        isSaving: true,
      },
    );
    this.updateElement();
  }

  errorAddComment() {
    this._film = Object.assign(
      {},
      this._film,
      {
        isSaving: false,
      },
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
