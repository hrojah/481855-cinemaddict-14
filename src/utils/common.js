export const isEscPressed = (evt) => {
  return (evt.key === 'Escape' || evt.key === 'Esc');
};

export const getGenreCounts = (films) => {
  return films.reduce((acc, film) => {
    film.filmInfo.genres.forEach((genre) => {
      if (!acc[genre]) {
        acc[genre] = 0;
      }
      acc[genre] += 1;
    });
    return acc;
  },{});
};

export const isOnline = () => {
  return window.navigator.onLine;
};
