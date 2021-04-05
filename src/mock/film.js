import dayjs from 'dayjs';
import {generateComment} from './comment';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateGenres = () => {
  const genres = [
    'Musical',
    'Drama',
    'Western',
    'Comedy',
    'Cartoon',
  ];

  const genresCount = getRandomInteger(0, 3);
  const randomGenres = [];

  for (let i = 0; i < genresCount; i++) {
    const randomIndex = getRandomInteger(0, genres.length - 1);
    randomGenres.push(genres[randomIndex]);
  }
  return randomGenres.join(' ');
};

const generateCountry = () => {
  const country = [
    'USA',
    'France',
    'Russian',
    'Italy',
    'Spain',
  ];

  const randomIndex = getRandomInteger(0, country.length - 1);

  return country[randomIndex];
};

const generateDirector = () => {
  const directors = [
    'Guillermo del Toro',
    'David Cronenberg',
    'Woody Allen',
    'Tim Burton',
    'Lars von Trier',
    'Roman Polanski',
  ];

  const randomIndex = getRandomInteger(1, directors.length -1);

  return directors[randomIndex];
};

const generateActors = () => {
  const actors = [
    'Jack Nicholson',
    'Marlon Brando',
    'Robert De Niro',
    'Al Pacino',
    'Tom Hanks',
    'Anthony Hopkins',
    'Michael Caine',
    'Robin Williams',
  ];
  const actorsCount = getRandomInteger(1, 5);
  const randomActors = [];

  for (let i = 0; i < actorsCount; i++) {
    const randomIndex = getRandomInteger(0, actors.length - 1);
    randomActors.push(actors[randomIndex]);
  }
  return randomActors.join(', ');
};

const generateWriters = () => {
  const writers = [
    'Charlie Kaufman',
    'Terry Giliam',
    'Joel Coen',
    'Aaron Sorkin',
    'Martin Scorsese',
    'Francis Ford Coppola',
    'Wes Anderson',
    'Quentin Tarantino',
    'Robert Zemeckis',
  ];

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
  const names = [
    'The Shawshank Redemption',
    'Green mile',
    'Interstellar',
    'Forrest Gump',
    'Back to the Future',
    'Pulp Fiction',
    'Inception',
    'Snatch',
  ];

  const randomIndex = getRandomInteger(0, names.length - 1);

  return names[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];
  const descriptionCount = getRandomInteger(0, 5);
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
