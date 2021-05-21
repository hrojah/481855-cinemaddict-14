import AbstractView from './abstract';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {name, count, type} = filter;
  return `<a href="#${name}" id="${type}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">${name} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createMenuNavTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" id="stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MenuNav extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuNavTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.id);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll('.main-navigation__item').forEach((item) => {
      item.addEventListener('click', this._filterTypeChangeHandler);
    });
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.id);
  }

  setStatsClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelectorAll('a').forEach((item) => {
      item.addEventListener('click', this._menuClickHandler);
    });
  }
}
