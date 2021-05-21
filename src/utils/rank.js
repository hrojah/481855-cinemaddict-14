export const createRank = (films) => {
  const filmsCount = films.length;

  switch (true) {
    case filmsCount === 0:
      return '';
    case filmsCount >= 0 && filmsCount <= 10:
      return 'Novice';
    case filmsCount >= 10 && filmsCount <= 20:
      return 'Fun';
    case filmsCount > 20:
      return 'Movie Buff';
  }
};
