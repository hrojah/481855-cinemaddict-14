export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
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

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
