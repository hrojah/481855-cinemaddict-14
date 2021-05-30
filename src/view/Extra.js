import AbstractView from './abstract';

const createTopRatedTemplate = (title, value) => {
  return `<section class="films-list films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container ${value}">
      </div>
    </section>`;
};

export default class Extra extends AbstractView {
  constructor(title, value) {
    super();
    this._title = title;
    this._value = value;
  }

  getTemplate() {
    return createTopRatedTemplate(this._title, this._value);
  }
}
