import BoardView from '../view/board';
import SortView from '../view/sort';
import FilmListView from '../view/film-list';
import ShowMoreButtonView from '../view/show-more-button';
import TopRatedView from '../view/top-rated';
import MostCommentedView from '../view/most-commented';
import ListEmptyView from '../view/list-empty';
import {remove, render, RenderPosition} from '../utils/render';
import {DISPLAYED_MOVIES, FILM_COUNT_PER_STEP} from '../const';
import {mostCommentsFilms, topRatedFilms, sortDate, sortRating} from '../utils/films';
import FilmPresenter from './film';
import {updateItem} from '../utils/common';
import {SortType} from '../const';

export default class Board {
  constructor(siteBodyElement, boardContainer) {
    this._bodyComponent = siteBodyElement;
    this._boardContainer = boardContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;


    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._filmListComponent = new FilmListView();
    this._listEmptyComponent = new ListEmptyView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._cardContainerElement = this._filmListComponent.getElement().querySelector('.films-list__container');
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();
    this._renderSort();
    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(filmListElement, film) {
    const filmPresenter = new FilmPresenter(this._bodyComponent, filmListElement, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilm(this._cardContainerElement, boardFilm));
  }

  _renderListEmpty() {
    render(this._boardContainer, this._listEmptyComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._boardFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._boardComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._boardFilms.length, FILM_COUNT_PER_STEP));

    if (this._boardFilms.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }

    this._renderTopRated();
    this._renderMostCommented();
  }

  _renderBoard() {
    if (this._boardFilms.length === 0) {
      this._renderListEmpty();
      return;
    }
    render(this._boardComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    this._renderFilmList();
  }

  _renderTopRated() {
    this._topRatedContainer = new TopRatedView();
    this._topRatedFilmsContainer = this._topRatedContainer.getElement().querySelector('.top-rated');
    render(this._boardComponent, this._topRatedContainer, RenderPosition.BEFOREEND);

    for (let i = 0; i < DISPLAYED_MOVIES; i++) {
      this._renderFilm(this._topRatedFilmsContainer, topRatedFilms(this._boardFilms)[i]);
    }
  }

  _renderMostCommented() {
    this._mostCommentedContainer = new MostCommentedView();
    this._mostCommentedFilmsContainer = this._mostCommentedContainer.getElement().querySelector('.most-commented');
    render(this._boardComponent, this._mostCommentedContainer, RenderPosition.BEFOREEND);

    for (let i = 0; i < DISPLAYED_MOVIES; i++) {
      this._renderFilm(this._mostCommentedFilmsContainer, mostCommentsFilms(this._boardFilms)[i]);
    }
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
    remove(this._topRatedContainer);
    remove(this._mostCommentedContainer);
  }

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._sourcedBoardFilms = updateItem(this._sourcedBoardFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.RATING:
        this._boardFilms.sort(sortRating);
        break;
      case SortType.DATE:
        this._boardFilms.sort(sortDate);
        break;
      default:
        this._boardFilms = this._sourcedBoardFilms.slice();
    }
    this._currentSortType = sortType;
  }
}
