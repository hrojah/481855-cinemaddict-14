import AbstractView from './abstract';
import {createRank} from '../utils/rank';

const createRankUserTemplate = (films) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${createRank(films)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class RankUser extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createRankUserTemplate(this._films);
  }
}
