import {FilmCount} from '../const';

export const createRank = (films) => {
  const watchedFilms = films.filter((film) => film.userDetails.isWatched);

  switch (true) {
    case watchedFilms.length === 0:
      return '';
    case watchedFilms.length >= 0 && watchedFilms.length <= FilmCount.NOVICE:
      return 'Novice';
    case watchedFilms.length >= FilmCount.NOVICE && watchedFilms.length <= FilmCount.FUN:
      return 'Fun';
    case watchedFilms.length > FilmCount.FUN:
      return 'Movie Buff';
  }
};
