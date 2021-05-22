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

  setComments(film) {
    this._comments = film.comments.map((comment) => ({...comment}));
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
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        userDetails: Object.assign(
          {},
          film.user_details,
          {
            isFavorite: film.user_details.favorite,
            isWatched: film.user_details.already_watched,
            isWatchList: film.user_details.watchlist,
            watchingDate: film.user_details.watching_date,
          },
        ),
        filmInfo: Object.assign(
          {},
          film.film_info,
          {
            ageRating: film.film_info.age_rating,
            originName: film.film_info.alternative_title,
            name: film.film_info.title,
            genres: film.film_info.genre,
            rating: film.film_info.total_rating,
            release: Object.assign(
              {},
              film.film_info.release,
              {
                releaseDate: new Date(film.film_info.release.date),
                country: film.film_info.release.release_country,
              },
            ),
          },
        ),
      },
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;
    delete adaptedFilm.userDetails.favorite;
    delete adaptedFilm.userDetails.already_watched;
    delete adaptedFilm.userDetails.watchlist;
    delete adaptedFilm.userDetails.watching_date;
    delete adaptedFilm.filmInfo.age_rating;
    delete adaptedFilm.filmInfo.alternative_title;
    delete adaptedFilm.filmInfo.title;
    delete adaptedFilm.filmInfo.genre;
    delete adaptedFilm.filmInfo.total_rating;
    delete adaptedFilm.filmInfo.release.date;
    delete adaptedFilm.filmInfo.release.release_country;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'user_details': Object.assign(
          {},
          film.userDetails,
          {
            favorite: film.userDetails.isFavorite,
            'already_watched': film.userDetails.isWatched,
            watchlist: film.userDetails.isWatchList,
            'watching_date': film.userDetails.watchingDate,
          },
        ),
        'film_info': Object.assign(
          {},
          film.filmInfo,
          {
            'age_rating': film.filmInfo.ageRating,
            'alternative_title': film.filmInfo.originName,
            title: film.filmInfo.name,
            genre: film.filmInfo.genres,
            'total_rating': film.filmInfo.rating,
            release: Object.assign(
              {},
              film.filmInfo.release,
              {
                date: film.filmInfo.release.releaseDate.toISOString(),
                'release_country': film.filmInfo.release.country,
              },
            ),
          },
        ),
      },
    );

    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;
    delete adaptedFilm.user_details.isFavorite;
    delete adaptedFilm.user_details.isWatched;
    delete adaptedFilm.user_details.isWatchList;
    delete adaptedFilm.user_details.watchingDate;
    delete adaptedFilm.film_info.ageRating;
    delete adaptedFilm.film_info.originName;
    delete adaptedFilm.film_info.name;
    delete adaptedFilm.film_info.genres;
    delete adaptedFilm.film_info.rating;
    delete adaptedFilm.film_info.release.releaseDate;
    delete adaptedFilm.filmInfo.release.country;

    return adaptedFilm;
  }
}
