import Observer from '../utils/observer';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
    this._comments = [];
  }

  setFilms(films) {
    this._films = films.slice();
  }

  setComments(film) {
    this._comments = film.comments.map((comment) => ({...comment}));
  }

  getComments() {
    return this._comments;
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addComment(updateType, update, id) {
    const film = this._films.find((film) => film.id === id);
    this._comments = [
      update,
      ...this._comments,
    ];

    film.comments = this._comments;
    this._notify(updateType, film);
  }

  deleteComment(updateType, update, id) {
    const film = this._films.find((film) => film.id === id);
    film.comments = film.comments.filter((comment) => comment.id !== update.id);
    this._notify(updateType, film);
  }
}
