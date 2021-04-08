import dayjs from 'dayjs';
import {generateComment} from './comment';
import {getRandomInteger} from '../utils';
import {genres, country, directors, actors, writers, names, descriptions} from '../const';

const generateGenres = () => {
  const genresCount = getRandomInteger(1, 3);
  const randomGenres = [];

  for (let i = 0; i < genresCount; i++) {
    const randomIndex = getRandomInteger(0, genres.length - 1);
    randomGenres.push(genres[randomIndex]);
  }
  return randomGenres.join(' ');
};

const generateCountry = () => {
  const randomIndex = getRandomInteger(0, country.length - 1);

  return country[randomIndex];
};

const generateDirector = () => {
  const randomIndex = getRandomInteger(1, directors.length -1);

  return directors[randomIndex];
};

const generateActors = () => {
  const actorsCount = getRandomInteger(1, 5);
  const randomActors = [];

  for (let i = 0; i < actorsCount; i++) {
    const randomIndex = getRandomInteger(0, actors.length - 1);
    randomActors.push(actors[randomIndex]);
  }
  return randomActors.join(', ');
};

const generateWriters = () => {
  const writersCount = getRandomInteger(1, 3);
  const randomWriters = [];

  for (let i = 0; i < writersCount; i++) {
    const randomIndex = getRandomInteger(0, writers.length - 1);
    randomWriters.push(writers[randomIndex]);
  }
  return randomWriters.join(', ');
};

const generateRating = (min = 0, max = 10) => {
  const rating = Math.random() * (max - min) + min;
  return rating.toFixed(1);
};

const generateAgeRating = () => {
  const age = getRandomInteger(2, 18);
  return age + '+';
};

const generateName = () => {
  const randomIndex = getRandomInteger(0, names.length - 1);

  return names[randomIndex];
};

const generateDescription = () => {
  const descriptionCount = getRandomInteger(1, 5);
  const randomDescriptions = [];

  for (let i = 0; i < descriptionCount; i++) {
    const randomIndex = getRandomInteger(1, descriptions.length - 1);
    randomDescriptions.push(descriptions[randomIndex]);
  }
  return randomDescriptions.join(' ');
};

const generateDate = () => {
  const maxYearsGap = 90;
  const yearsGap = getRandomInteger(-maxYearsGap, 0);

  return dayjs().add(yearsGap, 'year').toDate();
};

const generateRuntime = () => {
  const duration = getRandomInteger(90, 180);
  const hours = Math.floor(duration / 60);
  const minutesLeft = duration - (hours * 60);
  return hours + 'h' + ' ' + minutesLeft + 'm';
};

export const generateFilm = () => {
  const commentCount = getRandomInteger(0, 5);
  const comments = new Array(commentCount).fill().map(generateComment);

  return {
    name: generateName(),
    originName: generateName(),
    poster: './images/posters/made-for-each-other.png',
    rating: generateRating(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    releaseDate: generateDate(),
    runtime: generateRuntime(),
    country: generateCountry(),
    genres: generateGenres(),
    description: generateDescription(),
    ageRating: generateAgeRating(),
    isWatchList: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    comments: comments,
  };
};
