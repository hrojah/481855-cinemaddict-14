import {filmCount} from '../const';

export const createRank = (films) => {
  const filmsCount = films.length;

  switch (true) {
    case filmsCount === 0:
      return '';
    case filmsCount >= 0 && filmsCount <= filmCount.NOVICE:
      return 'Novice';
    case filmsCount >= filmCount.NOVICE && filmsCount <= filmCount.FUN:
      return 'Fun';
    case filmsCount > filmCount.FUN:
      return 'Movie Buff';
  }
};
