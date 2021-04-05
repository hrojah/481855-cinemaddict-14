import dayjs from "dayjs";
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateText = () => {
  const texts = [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?',
  ];

  const randomIndex = getRandomInteger(0, texts.length - 1);

  return texts[randomIndex];
}

const generateAuthor = () => {
  const autors = [
    'Tim Macoveev',
    'John Doe',
    'Jane Doe',
  ];

  const randomIndex = getRandomInteger(0, autors.length - 1);

  return autors[randomIndex];
}

const generateEmoji = () => {
  const emoji = [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ];

  const randomIndex = getRandomInteger(0, emoji.length - 1);

  return `./images/emoji/` + emoji[randomIndex] + `.png`
}

const generateDate = () => {
  const maxDaysGap = 7;
  const DaysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(DaysGap, 'day').toDate()
}

export const generateComment = () => {
  return {
    text: generateText(),
    emoji: generateEmoji(),
    author: generateAuthor(),
    date: generateDate(),
  }
}
