import SmartView from './smart';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {formatDate, genre, fullDate} from '../utils/films';
import he from 'he';
import {UpdateType, UserAction} from '../const';
dayjs.extend(relativeTime);

const createPopupTemplate = ({filmInfo: {release: {releaseDate, country}, name, originName, rating, director, writers, actors, ageRating, runtime, genres, poster, description}, userDetails: {isFavorite, isWatched, isWatchList}, comments}, text) => {
  const isCheckboxChecked = (flag) => {
    return flag ? 'checked' : '';
  };

  const renderComments = () => {
    return comments
      .map((comment) => {
        return `<li class="film-details__comment">
           <span class="film-details__comment-emoji">
             <img src="${comment.emoji}" width="55" height="55" alt="emoji-smile">
           </span>
           <div>
             <p class="film-details__comment-text">${he.encode(comment.text)}</p>
             <p class="film-details__comment-info">
               <span class="film-details__comment-author">${comment.author}</span>
               <span class="film-details__comment-day">${dayjs(comment.date).fromNow()}</span>                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
      })
      .join('');
  };

  const renderGenres = () => {
    return genres
      .map((genre) => {
        return `<span class="film-details__genre">${genre}</span>`;
      })
      .join(' ');
  };

  const renderActors = () => {
    return actors
      .map((actor) => {
        return `${actor}`;
      })
      .join(', ');
  };

  const renderWriters = () => {
    return writers
      .map((writer) => {
        return `${writer}`;
      })
      .join(', ');
  };

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${name}</h3>
              <p class="film-details__title-original">Original: ${originName}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${renderWriters()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${renderActors()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${fullDate(releaseDate)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatDate(runtime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genre(genres)}</td>
              <td class="film-details__cell">
                ${renderGenres()}
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isCheckboxChecked(isWatchList)}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isCheckboxChecked(isWatched)}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isCheckboxChecked(isFavorite)}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
        ${renderComments()}
        </ul>
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmPopup extends SmartView {
  constructor(film, changeData) {
    super();
    this._film = film;
    this._changeData = changeData;
    this._id = this._film.id;
    this._textarea =  '';
    this._newComment = {};
    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);
    this._watchedToggleHandler = this._watchedToggleHandler.bind(this);
    this._watchListToggleHandler = this._watchListToggleHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._textInputHandler = this._textInputHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._film, this._textarea);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setClickHandler(this._callback.click);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__control-label--favorite').addEventListener('click', this._favoriteToggleHandler);
    this.getElement().querySelector('.film-details__control-label--watched').addEventListener('click', this._watchedToggleHandler);
    this.getElement().querySelector('.film-details__control-label--watchlist').addEventListener('click', this._watchListToggleHandler);
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._emojiClickHandler);
    this.getElement().querySelectorAll('.film-details__comment-delete').forEach((item, index) => {
      item.addEventListener('click', this._deleteClickHandler(index, this._id));
    });
    this.getElement().querySelector('form').addEventListener('keydown', (evt) => {
      if (evt.keyCode === 13 && (evt.ctrlKey || evt.metaKey)) {
        this._formSubmitHandler(evt);
      }
    });
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._textInputHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-details__control-label--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('.film-details__control-label--watchlist').addEventListener('click', this._watchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-details__control-label--watched').addEventListener('click', this._watchedClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.submit = callback;
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.submit(this._newComment, this._id);
    this._textarea = '';
    this.updateElement();
    this._newComment = {};
  }

  _favoriteToggleHandler(evt) {
    evt.preventDefault();
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
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
    this.updateElement();
  }

  _watchedToggleHandler(evt) {
    evt.preventDefault();
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
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
    this.updateElement();
  }

  _watchListToggleHandler(evt) {
    evt.preventDefault();
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
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
    this.updateElement();
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();
    this._newComment.emoji = `images/emoji/${evt.target.value}.png`;
    this.getElement().querySelector('.film-details__add-emoji-label').innerHTML = `<img src="images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji-smile">`;
  }

  setDeleteClickHandler(callback) {
    this._callback.delete = callback;
  }

  setInputHandler() {
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._textInputHandler);
  }

  _deleteClickHandler(index) {
    return (evt) => {
      evt.preventDefault();
      this._callback.delete(index, this._id);
      this.updateElement();
    };
  }

  _textInputHandler(evt) {
    evt.preventDefault();
    this._newComment.text = evt.target.value;
    this._textarea = evt.target.value;
  }
}
