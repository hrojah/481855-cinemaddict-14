import BoardView from '../view/board';
import SortView from '../view/sort';
import FilmListView from '../view/film-list';
import ShowMoreButtonView from '../view/show-more-button';
import TopRatedView from '../view/top-rated';
import MostCommentedView from '../view/most-commented';
import ListEmptyView from '../view/list-empty';
import LoadingView from '../view/loading';
import {remove, render, RenderPosition} from '../utils/render';
import {DISPLAYED_MOVIES, FILM_COUNT_PER_STEP, UpdateType, UserAction, SortType} from '../const';
import {mostCommentsFilms, topRatedFilms, sortDate, sortRating} from '../utils/films';
import FilmPresenter from './film';
import {filter} from '../utils/filter';

export default class Board {
  constructor(siteBodyElement, boardContainer, filmsModel, filterModel, api) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._bodyComponent = siteBodyElement;
    this._boardContainer = boardContainer;
    this._api = api;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._filmPresenterTopRated = {};
    this._filmPresenterMostCommented = {};
    this._currentSortType = SortType.DEFAULT;
    this._sortComponent = null;
    this._showMoreButtonComponent = null;
    this._isLoading = true;


    this._boardComponent = new BoardView();
    this._filmListComponent = new FilmListView();
    this._listEmptyComponent = new ListEmptyView();
    this._loadingComponent = new LoadingView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._cardContainerElement = this._filmListComponent.getElement().querySelector('.films-list__container');
  }

  init() {
    this._renderBoard();
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
    this._currentSortType = SortType.DEFAULT;
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[filterType](films);
    const sortedFilms = filteredFilms.slice();

    switch (this._currentSortType) {
      case SortType.DATE:
        return sortedFilms.sort(sortDate);
      case SortType.RATING:
        return sortedFilms.sort(sortRating);
    }

    return filteredFilms;
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(filmListElement, film) {
    const filmPresenter = new FilmPresenter(this._bodyComponent, filmListElement, this._handleViewAction, this._handleModeChange, this._filmsModel, this._api);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderTopRatedFilm(filmListElement, film) {
    const filmPresenter = new FilmPresenter(this._bodyComponent, filmListElement, this._handleViewAction, this._handleModeChange, this._filmsModel, this._api);
    filmPresenter.init(film);
    this._filmPresenterTopRated[film.id] = filmPresenter;
  }

  _renderMostCommentedFilm(filmListElement, film) {
    const filmPresenter = new FilmPresenter(this._bodyComponent, filmListElement, this._handleViewAction, this._handleModeChange, this._filmsModel, this._api);
    filmPresenter.init(film);
    this._filmPresenterMostCommented[film.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(this._cardContainerElement, film));
  }

  _renderListEmpty() {
    render(this._boardContainer, this._listEmptyComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }
    this._showMoreButtonComponent = new ShowMoreButtonView();
    render(this._boardComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const films = this._getFilms();
    const filmCount = films.length;


    if (filmCount === 0) {
      this._renderListEmpty();
      return;
    }

    this._renderSort();
    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));

    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }

    this._renderTopRated();
    this._renderMostCommented();
  }

  _renderTopRated() {
    this._topRatedFilms = topRatedFilms(this._getFilms());
    this._topRatedContainer = new TopRatedView();
    this._topRatedFilmsContainer = this._topRatedContainer.getElement().querySelector('.top-rated');
    if (this._topRatedFilms.length) {
      render(this._boardComponent, this._topRatedContainer, RenderPosition.BEFOREEND);

      if (this._topRatedFilms.length > DISPLAYED_MOVIES) {
        for (let i = 0; i < DISPLAYED_MOVIES; i++) {
          this._renderTopRatedFilm(this._topRatedFilmsContainer, this._topRatedFilms[i]);
        }
        return;
      }

      for (let i = 0; i < this._topRatedFilms.length; i++) {
        this._renderTopRatedFilm(this._topRatedFilmsContainer, this._topRatedFilms[i]);
      }
    }
  }

  _renderMostCommented() {
    this._mostCommentedFilms = mostCommentsFilms(this._getFilms());
    this._mostCommentedContainer = new MostCommentedView();
    this._mostCommentedFilmsContainer = this._mostCommentedContainer.getElement().querySelector('.most-commented');
    if (this._mostCommentedFilms.length) {
      render(this._boardComponent, this._mostCommentedContainer, RenderPosition.BEFOREEND);

      if (this._mostCommentedFilms.length > DISPLAYED_MOVIES) {
        for (let i = 0; i < DISPLAYED_MOVIES; i++) {
          this._renderMostCommentedFilm(this._mostCommentedFilmsContainer, this._mostCommentedFilms[i]);
        }
        return;
      }

      for (let i = 0; i < this._mostCommentedFilms.length; i++) {
        this._renderMostCommentedFilm(this._mostCommentedFilmsContainer, this._mostCommentedFilms[i]);
      }
    }
  }

  _handleViewAction(actionType, updateType, update, id) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update)
          .then((response) => {
            this._filmsModel.updateFilm(updateType, response);
          });
        break;
      case UserAction.ADD_COMMENT:
        this._filmPresenter[id].setSaving(update);
        this._api.addComments(id, update)
          .then((response) => {
            this._filmsModel.addComment(updateType, response);
          })
          .catch(() => {
            this._filmPresenter[id].setAborting();
          });
        break;
      case UserAction.DELETE_COMMENT:
        this._filmPresenter[id].setDelete(update);
        this._api.deleteComment(update.id)
          .then(() => {
            this._filmsModel.deleteComment(updateType, update, id);
          })
          .catch(() => {
            this._filmPresenter[id].setViewState(update);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        if (data.id in this._filmPresenter) {
          this._filmPresenter[data.id].init(data);
        }
        if (data.id in this._filmPresenterTopRated) {
          this._filmPresenterTopRated[data.id].init(data);
        }
        if (data.id in this._filmPresenterMostCommented) {
          this._filmPresenterMostCommented[data.id].init(data);
        }
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
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
    this._currentSortType = sortType;
    this._clearBoard({resetRenderedFilmCount: true});
    this._renderBoard();
  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const taskCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._sortComponent);
    remove(this._listEmptyComponent);
    remove(this._loadingComponent);
    remove(this._showMoreButtonComponent);
    remove(this._topRatedContainer);
    remove(this._mostCommentedContainer);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(taskCount, this._renderedFilmCount);
    }
    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderLoading() {
    render(this._boardContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }
}
