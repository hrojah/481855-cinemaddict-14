import {createRankUserTemplate} from "./view/rank-user";
import {createMenuNavTemplate} from "./view/menu-nav";
import {createSortTemplate} from "./view/sort";
import {createFilmListTemplate} from "./view/film-list";
import {createFilmCardTemplate} from "./view/film-card";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
import {createTopRatedTemplate} from "./view/top-rated";
import {createMostCommentedTemplate} from "./view/most-commented";
import {createAmountFilmsTemplate} from "./view/amount-films";

const FILM_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);


render (siteHeaderElement, createRankUserTemplate(), `beforeend`);
render (siteMainElement, createMenuNavTemplate(), `beforeend`);
render (siteMainElement, createSortTemplate(), `beforeend`);
render (siteMainElement, createFilmListTemplate(), `beforeend`);

const filmsBoardElement = document.querySelector(`.films`);
const filmsListElement = document.querySelector(`.films-list`);
const cardContainerElement = document.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(cardContainerElement, createFilmCardTemplate(), `beforeend`);
}
render (filmsListElement, createShowMoreButtonTemplate(), `beforeend`);
render (filmsBoardElement, createTopRatedTemplate(), `beforeend`);
render (filmsBoardElement, createMostCommentedTemplate(), `beforeend`);
render (footerStatisticsElement, createAmountFilmsTemplate(), `beforeed`);
