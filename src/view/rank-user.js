import AbstractView from './abstract';

const createRank = (films) => {
  const filmsCount = films.length;

  switch (true) {
    case filmsCount === 0:
      return '';
    case filmsCount >= 0 && filmsCount <= 10:
      return '<p class="profile__rating">Novice</p>';
    case filmsCount >= 10 && filmsCount <= 20:
      return '<p class="profile__rating">Fun</p>';
    case filmsCount > 20:
      return '<p class="profile__rating">Movie Buff</p>';
  }
};

const createRankUserTemplate = (films) => {
  return `<section class="header__profile profile">
       ${createRank(films)}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class RankUser extends AbstractView {
  constructor(films) {
    debugger;
    super();
    this._films = films;
  }

  getTemplate() {
    return createRankUserTemplate(this._films);
  }
}
