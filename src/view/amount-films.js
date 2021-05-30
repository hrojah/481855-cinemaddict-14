import AbstractView from './abstract';

const createAmountFilmsTemplate = (films) => {
  return `<p>${films.length} movies inside</p>`;
};

export default class AmountFilms extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }
  getTemplate() {
    return createAmountFilmsTemplate(this._films);
  }
}
