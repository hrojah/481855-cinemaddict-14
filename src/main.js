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
import {topRatedFilms, mostCommentsFilms, render,isEscPressed, RenderPosition} from './utils';
import {DISPLAYED_MOVIES, FILM_COUNT_PER_STEP} from './const';

const FILM_COUNT = 20;
const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const renderBoard = (boardContainer, boardFilms) => {
  const boardComponent = new BoardView();

  render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

  if (boardFilms.length === 0) {
    render(siteMainElement, new ListEmptyView().getElement(), RenderPosition.BEFOREEND);
  } else {
    render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

    const filmsListComponent = new FilmListView();

    render(boardComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);

    const cardContainerElement = filmsListComponent.getElement().querySelector('.films-list__container');

    boardFilms
      .slice(0, Math.min(films.length, FILM_COUNT_PER_STEP))
      .forEach((boardFilm) => renderFilm(cardContainerElement, boardFilm));

    if (films.length > FILM_COUNT_PER_STEP) {
      let renderedFilmCount = FILM_COUNT_PER_STEP;
      const showMoreButtonComponent = new ShowMoreButtonView();

      render(boardComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

      showMoreButtonComponent.getElement().addEventListener('click', (evt) => {
        evt.preventDefault();
        films
          .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
          .forEach((boardFilm) => renderFilm(cardContainerElement, boardFilm));

        renderedFilmCount += FILM_COUNT_PER_STEP;

        if (renderedFilmCount >= films.length) {
          showMoreButtonComponent.getElement().remove();
          showMoreButtonComponent.removeElement();
        }
      });
    }

    const topRatedContainer = new TopRatedView();

    render(boardComponent.getElement(), topRatedContainer.getElement(), RenderPosition.BEFOREEND);

    const topRatedFilmsContainer = topRatedContainer.getElement().querySelector('.top-rated');

    for (let i = 0; i < DISPLAYED_MOVIES; i++) {
      renderFilm(topRatedFilmsContainer, films[i]);
    }

    const mostCommentedContainer = new MostCommentedView();

    render(boardComponent.getElement(), mostCommentedContainer.getElement(), RenderPosition.BEFOREEND);

    const mostCommentedFilmsContainer = mostCommentedContainer.getElement().querySelector('.most-commented');

    for (let i = 0; i < DISPLAYED_MOVIES; i++) {
      renderFilm(mostCommentedFilmsContainer, films[i]);
    }
  }
};

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCardView(film);

  const renderPopup = () => {
    const filmPopupComponent = new FilmPopupView(film);
    render(siteBodyElement, filmPopupComponent.getElement(), RenderPosition.BEFOREEND);
    siteBodyElement.classList.add('hide-overflow');

    filmPopupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
      filmPopupComponent.getElement().remove();
      siteBodyElement.classList.remove('hide-overflow');
    });

    const onEscKeydown = (evt) => {
      if (isEscPressed(evt)) {
        evt.preventDefault();
        filmPopupComponent.getElement().remove();
        siteBodyElement.classList.remove('hide-overflow');
      }
    };
    document.addEventListener('keydown', onEscKeydown);
  };

  filmComponent.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    renderPopup();
  });

  filmComponent.getElement().querySelector('.film-card__title').addEventListener('click', () => {
    renderPopup();
  });

  filmComponent.getElement().querySelector('.film-card__comments').addEventListener('click', () => {
    renderPopup();
  });

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');


render(siteHeaderElement, new RankUserView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuNavView(filters).getElement(), RenderPosition.BEFOREEND);

renderBoard(siteMainElement, films);

render(footerStatisticsElement, new AmountFilmsView().getElement(), RenderPosition.BEFOREEND);
