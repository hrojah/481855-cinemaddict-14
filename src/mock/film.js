import {generateComment} from './comment';
import {getRandomInteger, getRandomElement, getRandomArr} from '../utils/common';
import {GENRES, COUNTRY, DIRECTORS, ACTORS, WRITERS, NAMES, DESCRIPTIONS, MIN_AGE, MAX_AGE, MIN_DURATION, MAX_DURATION, MIN_ELEMENTS, MAX_ELEMENTS, COUNT_ELEMENTS} from '../const';
import {nanoid} from 'nanoid';

const generateRating = (min = 0, max = 10) => {
  const rating = Math.random() * (max - min) + min;
  return rating.toFixed(1);
};

const generateAgeRating = () => {
  const age = getRandomInteger(MIN_AGE, MAX_AGE);
  return age + '+';
};

const generateDescription = () => {
  const descriptionCount = getRandomInteger(MIN_ELEMENTS, MAX_ELEMENTS);
  const randomDescriptions = [];

  for (let i = 0; i < descriptionCount; i++) {
    const randomIndex = getRandomInteger(MIN_ELEMENTS, DESCRIPTIONS.length - 1);
    randomDescriptions.push(DESCRIPTIONS[randomIndex]);
  }
  return randomDescriptions.join(' ');
};

const generateDate = () => {
  const date = getRandomInteger(-1104548400000, Date.now());
  return new Date(date);
};

const generateWatchingDate = () => {
  const date = getRandomInteger(31536000000, Date.now());
  return new Date(date);
};

const generateRuntime = () => {
  return getRandomInteger(MIN_DURATION, MAX_DURATION);
};


export const generateFilm = () => {
  const commentCount = getRandomInteger(0, MAX_ELEMENTS);
  const comments = new Array(commentCount).fill().map(generateComment);

  return {
    id: nanoid(),
    name: getRandomElement(NAMES),
    originName: getRandomElement(NAMES),
    poster: './images/posters/made-for-each-other.png',
    rating: generateRating(),
    director: getRandomElement(DIRECTORS),
    writers: getRandomArr(MIN_ELEMENTS, COUNT_ELEMENTS, WRITERS).join(', '),
    actors: getRandomArr(MIN_ELEMENTS, MAX_ELEMENTS, ACTORS).join(', '),
    releaseDate: generateDate(),
    watchingDate: generateWatchingDate(),
    runtime: generateRuntime(),
    country: getRandomElement(COUNTRY),
    genres: getRandomArr(MIN_ELEMENTS,COUNT_ELEMENTS, GENRES),
    description: generateDescription(),
    ageRating: generateAgeRating(),
    isWatchList: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    comments: comments,
  };
};
