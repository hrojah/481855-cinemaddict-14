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
