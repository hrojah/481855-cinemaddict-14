import {MINUTES_IN_HOUR} from '../const';
import dayjs from 'dayjs';

export const date = (date) => {
  return date.getFullYear();
};

export const topRatedFilms = (films) => {
  return films.slice().sort((a, b) => b.rating - a.rating);
};

export const mostCommentsFilms = (films) => {
  return films.slice().sort((a,b) => b.comments.length - a.comments.length);
};

export const sortRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

export const sortDate = (filmA, filmB) => {
  return filmB.releaseDate - filmA.releaseDate;
};

export const formatDate = (runtime) => {
  const hours = Math.floor(runtime / MINUTES_IN_HOUR);
  const minutesLeft = runtime - (hours * MINUTES_IN_HOUR);
  return hours + 'h' + ' ' + minutesLeft + 'm';
};

export const genre = (genres) => {
  return genres.length > 1 ? 'Genres' : 'Genre';
};

export const fullDate = (date) => {
  return dayjs(date).format('DD MMMM YYYY');
};
