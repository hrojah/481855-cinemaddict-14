import FilmCardView from '../view/film-card';
import FilmPopupView from '../view/popup';
import {render, remove, replace, RenderPosition} from '../utils/render';
import {isEscPressed} from '../utils/common';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class Film {
  constructor(siteBodyElement, filmListContainer, changeData, changeMode) {
    this._siteBodyElement = siteBodyElement;
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._renderPopup = this._renderPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilmComponent = this._filmComponent;

    this._filmComponent = new FilmCardView(film);
    this._filmComponent.setClickHandler(this._renderPopup);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchListClickHandler(this._handleWatchlistClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);

    if (prevFilmComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT || this._mode === Mode.POPUP) {
      replace(this._filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  }

  _renderPopup() {
    this._changeMode();
    const prevPopupComponent = this._popupComponent;
    this._popupComponent = new FilmPopupView(this._film);
    this._mode = Mode.POPUP;

    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchListClickHandler(this._handleWatchlistClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._siteBodyElement.classList.add('hide-overflow');
    this._popupComponent.setClickHandler(this._closePopup);
    document.addEventListener('keydown', this._escKeydownHandler);

    if (prevPopupComponent === null) {
      render(this._siteBodyElement, this._popupComponent, RenderPosition.BEFOREEND);
    }
  }

  _closePopup() {
    remove(this._popupComponent);
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;

    this._siteBodyElement.classList.remove('hide-overflow');
  }

  _escKeydownHandler(evt) {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this._closePopup();
    }
  }

  destroy() {
    remove(this._filmComponent);
    if (this._popupComponent !== null) {
      this._closePopup();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatchList: !this._film.isWatchList,
        },
      ),
    );
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }
}
