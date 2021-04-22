import RankUserView from './view/rank-user';
import MenuNavView from './view/menu-nav';
import BoardView from './view/board';
import SortView from './view/sort';
import FilmPopupView from './view/popup';
import FilmListView from './view/film-list';
import FilmCardView from './view/film-card';
import ShowMoreButtonView from './view/show-more-button';
import TopRatedView from './view/top-rated';
import MostCommentedView from './view/most-commented';
import AmountFilmsView from './view/amount-films';
import ListEmptyView from './view/list-empty';
import {generateFilm} from './mock/film';
import {generateFilter} from './mock/filter';
import {topRatedFilms, mostCommentsFilms} from './utils/films';
import {render, remove, RenderPosition} from './utils/render';
import {isEscPressed} from './utils/common';
import {DISPLAYED_MOVIES, FILM_COUNT_PER_STEP} from './const';
import BoardPresenter from './presenter/board';

const FILM_COUNT = 20;
const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

// const renderBoard = (boardContainer, boardFilms) => {
//   const boardComponent = new BoardView();
//
//   render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
//
//   if (boardFilms.length === 0) {
//     render(siteMainElement, new ListEmptyView(), RenderPosition.BEFOREEND);
//   } else {
//     const filmsListComponent = new FilmListView();
//
//     render(boardComponent, filmsListComponent, RenderPosition.BEFOREEND);
//
//     const cardContainerElement = filmsListComponent.getElement().querySelector('.films-list__container');
//
//     boardFilms
//       .slice(0, Math.min(films.length, FILM_COUNT_PER_STEP))
//       .forEach((boardFilm) => renderFilm(cardContainerElement, boardFilm));
//
//     if (films.length > FILM_COUNT_PER_STEP) {
//       let renderedFilmCount = FILM_COUNT_PER_STEP;
//       const showMoreButtonComponent = new ShowMoreButtonView();
//
//       render(boardComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);
//
//       const showMoreFilms = () => {
//         films
//           .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
//           .forEach((boardFilm) => renderFilm(cardContainerElement, boardFilm));
//
//         renderedFilmCount += FILM_COUNT_PER_STEP;
//
//         if (renderedFilmCount >= films.length) {
//           remove(showMoreButtonComponent);
//         }
//       };
//
//       showMoreButtonComponent.setClickHandler(showMoreFilms);
//     }
//
//     const topRatedContainer = new TopRatedView();
//
//     render(boardComponent, topRatedContainer, RenderPosition.BEFOREEND);
//
//     const topRatedFilmsContainer = topRatedContainer.getElement().querySelector('.top-rated');
//
//     for (let i = 0; i < DISPLAYED_MOVIES; i++) {
//       renderFilm(topRatedFilmsContainer, topRatedFilms(films)[i]);
//     }
//
//     const mostCommentedContainer = new MostCommentedView();
//
//     render(boardComponent, mostCommentedContainer, RenderPosition.BEFOREEND);
//
//     const mostCommentedFilmsContainer = mostCommentedContainer.getElement().querySelector('.most-commented');
//
//     for (let i = 0; i < DISPLAYED_MOVIES; i++) {
//       renderFilm(mostCommentedFilmsContainer, mostCommentsFilms(films)[i]);
//     }
//   }
// };
//
// const renderFilm = (filmListElement, film) => {
//   const filmComponent = new FilmCardView(film);
//
//   const renderPopup = () => {
//     const filmPopupComponent = new FilmPopupView(film);
//     render(siteBodyElement, filmPopupComponent, RenderPosition.BEFOREEND);
//     siteBodyElement.classList.add('hide-overflow');
//
//     const closePopup = () => {
//       remove(filmPopupComponent);
//       siteBodyElement.classList.remove('hide-overflow');
//     };
//
//     filmPopupComponent.setClickHandler(closePopup);
//
//     const onEscKeydown = (evt) => {
//       if (isEscPressed(evt)) {
//         evt.preventDefault();
//         closePopup();
//       }
//     };
//     document.addEventListener('keydown', onEscKeydown);
//   };
//
//   filmComponent.setClickHandler(renderPopup);
//
//   render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
// };

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const boardPresenter = new BoardPresenter(siteBodyElement, siteMainElement);


render(siteHeaderElement, new RankUserView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuNavView(filters), RenderPosition.BEFOREEND);
boardPresenter.init(films);

render(footerStatisticsElement, new AmountFilmsView(), RenderPosition.BEFOREEND);
