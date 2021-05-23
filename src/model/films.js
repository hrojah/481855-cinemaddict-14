import Observer from '../utils/observer';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
    this._comments = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  setComments(comments, film) {
    this._film = film;
    this._film.comments = comments.map((comment) => ({...comment}));
    this._notify(this._film);
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
    this._comments = film.comments;
    this._notify(updateType, film);
  }

  static adaptToClient(film) {
    return {
      id: film.id,
      comments: film.comments,
      filmInfo:
        {
          ageRating: film.film_info.age_rating,
          originName: film.film_info.alternative_title,
          name: film.film_info.title,
          genres: film.film_info.genre,
          rating: film.film_info.total_rating,
          runtime: film.film_info.runtime,
          actors: film.film_info.actors,
          writers: film.film_info.writers,
          poster: film.film_info.poster,
          director: film.film_info.director,
          description: film.film_info.description,
          release: {
            releaseDate: new Date(film.film_info.release.date),
            country: film.film_info.release.release_country,
          },
        },
      userDetails:
        {
          isFavorite: film.user_details.favorite,
          isWatched: film.user_details.already_watched,
          isWatchList: film.user_details.watchlist,
          watchingDate: new Date(film.user_details.watching_date),
        },
    };
  }

  static adaptToClientComment(comment) {
    return {
      author: comment.author,
      id: comment.id,
      text: comment.comment,
      emoji: `./images/emoji/${comment.emotion}.png`,
      date: new Date(comment.date),
    };
  }

  static adaptToServerComment(comment) {
    return {
      comment: comment.text,
      emotion: comment.emoji,
    };
  }

  static adaptToServer(film) {
    return {
      id: film.id,
      comments: film.comments,
      film_info:
        {
          age_rating: film.filmInfo.ageRating,
          alternative_title: film.filmInfo.originName,
          title: film.filmInfo.name,
          genre: film.filmInfo.genres,
          total_rating: film.filmInfo.rating,
          runtime: film.filmInfo.runtime,
          actors: film.filmInfo.actors,
          writers: film.filmInfo.writers,
          poster: film.filmInfo.poster,
          director: film.filmInfo.director,
          description: film.filmInfo.description,
          release: {
            date: film.filmInfo.release.releaseDate.toISOString(),
            release_country: film.filmInfo.release.country,
          },
        },
      user_details:
        {
          favorite: film.userDetails.isFavorite,
          already_watched: film.userDetails.isWatched,
          watchlist: film.userDetails.isWatchList,
          watching_date: film.userDetails.watchingDate.toISOString(),
        },
    };
  }
}
