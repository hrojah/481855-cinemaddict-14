import RankUserView from './view/rank-user';
import MenuNavView from './view/menu-nav';
import SortView from './view/sort';
import FilmPopupView from './view/popup';
import FilmListView from './view/film-list';
import FilmCardView from './view/film-card';
import ShowMoreButtonView from './view/show-more-button';
import TopRatedView from './view/top-rated';
import MostCommentedView from './view/most-commented';
import AmountFilmsView from './view/amount-films';
import {generateFilm} from './mock/film';
import {generateFilter} from './mock/filter';
import {topRatedFilms, mostCommentsFilms, render, RenderPosition} from './utils';
import {DISPLAYED_MOVIES, FILM_COUNT_PER_STEP} from './const';

const FILM_COUNT = 20;
const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCardView(film);
  const filmPopupComponent = new FilmPopupView(film);

  const renderPopup = () => {
    render(siteBodyElement, filmPopupComponent.getElement(), RenderPosition.BEFOREEND);
    siteBodyElement.classList.add('hide-overflow');
  }

  filmComponent.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    renderPopup();
  });

  filmComponent.getElement().querySelector('.film-card__title').addEventListener('click', () => {
    renderPopup();
  });

  filmComponent.getElement().querySelector('.film-card__comments').addEventListener('click', () => {
    renderPopup();
  });

  filmPopupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    filmPopupComponent.getElement().remove();
    siteBodyElement.classList.remove('hide-overflow');
  })

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');


render(siteHeaderElement, new RankUserView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuNavView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const filmsBoardComponent = new FilmListView();
render(siteMainElement, filmsBoardComponent.getElement(), RenderPosition.BEFOREEND);

const cardContainerElement = filmsBoardComponent.getElement().querySelector('.films-list__container');
// renderTemplate(siteBodyElement, createPopupTemplate(films[0]), 'beforeend');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(cardContainerElement, films[i]);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;
  const showMoreButtonComponent = new ShowMoreButtonView();

  render(filmsBoardComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(cardContainerElement, film));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

const topRatedContainer = new TopRatedView();

render(filmsBoardComponent.getElement(), topRatedContainer.getElement(), RenderPosition.BEFOREEND);

const topRatedFilmsContainer = topRatedContainer.getElement().querySelector('.top-rated');

for (let i = 0; i < DISPLAYED_MOVIES; i++) {
  render(topRatedFilmsContainer, new FilmCardView(topRatedFilms(films)[i]).getElement(), RenderPosition.BEFOREEND);
}

const mostCommentedContainer = new MostCommentedView();

render(filmsBoardComponent.getElement(), mostCommentedContainer.getElement(), RenderPosition.BEFOREEND);

const mostCommentedFilmsContainer = mostCommentedContainer.getElement().querySelector('.most-commented');

for (let i = 0; i < DISPLAYED_MOVIES; i++) {
  render(mostCommentedFilmsContainer, new FilmCardView(mostCommentsFilms(films)[i]).getElement(), RenderPosition.BEFOREEND);
}

render(footerStatisticsElement, new AmountFilmsView().getElement(), RenderPosition.BEFOREEND);
