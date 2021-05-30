import {FilmCount} from '../const';

export const createRank = (films) => {
  const watchListFilms = films.filter((film) => film.userDetails.isWatchList);

  switch (true) {
    case watchListFilms.length === 0:
      return '';
    case watchListFilms.length >= 0 && watchListFilms.length <= FilmCount.NOVICE:
      return 'Novice';
    case watchListFilms.length >= FilmCount.NOVICE && watchListFilms.length <= FilmCount.FUN:
      return 'Fun';
    case watchListFilms.length > FilmCount.FUN:
      return 'Movie Buff';
  }
};
