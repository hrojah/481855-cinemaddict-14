import {createRankUserTemplate} from './view/rank-user';
import {createMenuNavTemplate} from './view/menu-nav';
import {createSortTemplate} from './view/sort';
import {createPopupTemplate} from './view/popup';
import {createFilmListTemplate} from './view/film-list';
import {createFilmCardTemplate} from './view/film-card';
import {createShowMoreButtonTemplate} from './view/show-more-button';
import {createTopRatedTemplate} from './view/top-rated';
import {createMostCommentedTemplate} from './view/most-commented';
import {createAmountFilmsTemplate} from './view/amount-films';
import {generateFilm} from './mock/film';
import {generateFilter} from './mock/filter';

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const topRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);
const mostCommentsFilms = films.slice().sort((a,b) => b.comments.length - a.comments.length);
const filters = generateFilter(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');


render (siteHeaderElement, createRankUserTemplate(filters), 'beforeend');
render (siteMainElement, createMenuNavTemplate(filters), 'beforeend');
render (siteMainElement, createSortTemplate(), 'beforeend');
render (siteMainElement, createFilmListTemplate(), 'beforeend');

const filmsBoardElement = document.querySelector('.films');
const cardContainerElement = document.querySelector('.films-list__container');
render (siteBodyElement, createPopupTemplate(films[0]), 'beforeend');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(cardContainerElement, createFilmCardTemplate(films[i]), 'beforeend');
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;
  render(filmsBoardElement, createShowMoreButtonTemplate(), 'beforeend');

  const loadMoreButton = filmsBoardElement.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(cardContainerElement, createFilmCardTemplate(film), 'beforeend'));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}
// render (filmsListElement, createShowMoreButtonTemplate(), 'beforeend');
render (filmsBoardElement, createTopRatedTemplate(), 'beforeend');

const topRatedFilmsContainer = document.querySelector('.top-rated');

for (let i = 0; i < 2; i++) {
  render(topRatedFilmsContainer, createFilmCardTemplate(topRatedFilms[i]), 'beforeend');
}
render (filmsBoardElement, createMostCommentedTemplate(), 'beforeend');

const mostCommentedFilmsContainer = document.querySelector('.most-commented');

for (let i = 0; i < 2; i++) {
  render(mostCommentedFilmsContainer, createFilmCardTemplate(mostCommentsFilms[i]), 'beforeend');
}
render (footerStatisticsElement, createAmountFilmsTemplate(), 'beforeend');
