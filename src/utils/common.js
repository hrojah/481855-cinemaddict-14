import {SHAKE_ANIMATION_TIMEOUT} from '../const';

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

export const shake = (element, callback) => {
  element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
  setTimeout(() => {
    element.style.animation = '';
    callback();
  }, SHAKE_ANIMATION_TIMEOUT);
};

export const isOnline = () => {
  return window.navigator.onLine;
};
