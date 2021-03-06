import FilmCardView from '../view/film-card';
import FilmPopupView from '../view/popup';
import {render, remove, replace, RenderPosition} from '../utils/render';
import {isEscPressed} from '../utils/common';
import {UserAction, UpdateType} from '../const';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class Film {
  constructor(siteBodyElement, filmListContainer, changeData, changeMode, filmsModel, api) {
    this._siteBodyElement = siteBodyElement;
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filmsModel = filmsModel;
    this._api = api;

    this._filmComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._renderPopup = this._renderPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._setComments = this._setComments.bind(this);
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
      if (this._mode === Mode.POPUP) {
        const prevPopupComponent = this._popupComponent;
        this._popupComponent = new FilmPopupView(this._film, this._changeData);
        this._comments = this._filmsModel.getComments();
        this._filmsModel.setComments(this._comments, this._film);
        this._popupComponent.updateElement();
        replace(this._popupComponent, prevPopupComponent);
        this._popupComponent.setFormSubmitHandler(this._handleFormSubmit);
        this._popupComponent.setClickHandler(this._closePopup);
        this._popupComponent.setDeleteClickHandler(this._handleDeleteClick);
        this._popupComponent.setInputHandler();
        remove(prevPopupComponent);
      }
    }

    remove(prevFilmComponent);
  }

  destroy() {
    remove(this._filmComponent);
    if (this._popupComponent !== null) {
      this._closePopup();
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  setSaving() {
    if (this._popupComponent) {
      this._popupComponent.addComment();
    }
  }

  setAborting() {
    if (this._popupComponent) {
      const resetFormState = () => {
        this._popupComponent.errorAddComment();
      };

      this._popupComponent.shake(resetFormState);
    }
  }

  setDelete(update) {
    if (this._popupComponent) {
      this._popupComponent.deleteComment(update);
    }
  }

  setViewState(update) {
    if (this._popupComponent) {
      const deletedComment = this._popupComponent.getDeletedComment(update);
      const resetFormState = () => {
        this._popupComponent.errorDeleteComment(update);
      };
      this._popupComponent.shake(resetFormState, deletedComment);
    }
  }

  _setComments() {
    this._api.getComments(this._film)
      .then((comments) => {
        this._filmsModel.setComments(comments, this._film);
        this._popupComponent.updateElement();
      })
      .catch(() => {
        this._filmsModel.setComments([], this._film);
      });
  }

  _renderPopup() {
    this._setComments();
    this._changeMode();
    const prevPopupComponent = this._popupComponent;
    this._popupComponent = new FilmPopupView(this._film, this._changeData);
    this._mode = Mode.POPUP;

    this._popupComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._siteBodyElement.classList.add('hide-overflow');
    this._popupComponent.setClickHandler(this._closePopup);
    this._popupComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._popupComponent.setInputHandler();
    document.addEventListener('keydown', this._escKeydownHandler);

    if (prevPopupComponent === null) {
      render(this._siteBodyElement, this._popupComponent, RenderPosition.BEFOREEND);
    }
    remove(prevPopupComponent);
  }

  _closePopup() {
    remove(this._popupComponent);
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this._escKeydownHandler);
    this._siteBodyElement.classList.remove('hide-overflow');
  }

  _escKeydownHandler(evt) {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: Object.assign(
            {},
            this._film.userDetails,
            {
              isFavorite: !this._film.userDetails.isFavorite,
            },
          ),
        },
      ),
    );
  }


  _handleWatchedClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: Object.assign(
            {},
            this._film.userDetails,
            {
              isWatched: !this._film.userDetails.isWatched,
            },
          ),
        },
      ),
    );
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: Object.assign(
            {},
            this._film.userDetails,
            {
              isWatchList: !this._film.userDetails.isWatchList,
            },
          ),
        },
      ),
    );
  }

  _handleFormSubmit(update, id) {
    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      update,
      id,
    );
  }

  _handleDeleteClick(index, id) {
    this._changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      this._film.comments[index],
      id,
    );
  }
}
