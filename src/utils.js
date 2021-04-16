export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const date = (date) => {
  return date.getFullYear();
};

export const topRatedFilms = (films) => {
  return films.slice().sort((a, b) => b.rating - a.rating);
};

export const mostCommentsFilms = (films) => {
  return films.slice().sort((a,b) => b.comments.length - a.comments.length);
};

export const getRandomElement = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

export const getRandomArr = (min, max, arr) => {
  const count = getRandomInteger(min, max);
  const randomArr = [];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * (arr.length - i)) + i;
    const element = arr[index];
    arr[index] = arr[i];
    arr[i] = element;
    randomArr.push(element);
  }
  return randomArr;
};

export const isEscPressed = (evt) => {
  return (evt.key === 'Escape' || evt.key === 'Esc');
};
