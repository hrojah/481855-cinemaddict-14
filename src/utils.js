import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const date = (date) => {
  return dayjs(date).format('YYYY');
};

export const fullDate = (date) => {
  return dayjs(date).format('DD MMMM YYYY');
};

export const commentDate = (date) => {
  return dayjs(date).format('YYYY/MM/DD hh:mm');
};

export const isCheckboxChecked = (flag) => {
  return flag === true ? 'checked' : '';
};

export const isButtonActive = (flag) => {
  return flag === true ? 'film-card__controls-item--active' : '';
};

export const genre = (genres) => {
  return genres.length > 1 ? 'Genres' : 'Genre';
};
