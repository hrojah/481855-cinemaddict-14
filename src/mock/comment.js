// import {TEXTS, AUTHORS} from '../const';
// import {getRandomInteger, getRandomElement} from '../utils/common';
// import {nanoid} from 'nanoid';
//
// const generateEmoji = () => {
//   const emoji = [
//     'smile',
//     'sleeping',
//     'puke',
//     'angry',
//   ];
//
//   const randomIndex = getRandomInteger(0, emoji.length - 1);
//
//   return './images/emoji/' + emoji[randomIndex] + '.png';
// };
//
// const generateDate = () => {
//   const day = getRandomInteger(1, 31);
//   return new Date().setDate(day);
// };
//
// export const generateComment = () => {
//   return {
//     id: nanoid(),
//     text: getRandomElement(TEXTS),
//     emoji: generateEmoji(),
//     author: getRandomElement(AUTHORS),
//     date: generateDate(),
//   };
// };
