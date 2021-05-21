import RankUserView from './view/rank-user';
import AmountFilmsView from './view/amount-films';
import StatisticsView from './view/statistics';
import {generateFilm} from './mock/film';
import FilterPresenter from './presenter/filter';
import {render, RenderPosition, remove} from './utils/render';
import BoardPresenter from './presenter/board';
import FilmsModel from './model/films';
import FilterModel from './model/filter';
import {filter} from './utils/filter';
import {FilterType, MenuItem} from './const';

const FILM_COUNT = 20;
const films = new Array(FILM_COUNT).fill().map(generateFilm);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);
const filterModel = new FilterModel();

let statisticComponent = null;

const handleStatsClick = (menuItem) => {
  boardPresenter.destroy();
  switch (menuItem) {
    case MenuItem.STATS:
      document.querySelector('.main-navigation__item--active').classList.remove('main-navigation__item--active');
      document.querySelector('.main-navigation__additional').classList.add('main-navigation__additional--active');
      statisticComponent = new StatisticsView(filmsModel.getFilms());
      render(siteMainElement, statisticComponent, RenderPosition.BEFOREEND);
      break;
    default:
      document.querySelector('.main-navigation__additional').classList.remove('main-navigation__additional--active');
      remove(statisticComponent);
      boardPresenter.init();
      filterPresenter.init();
      break;
  }
};

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const boardPresenter = new BoardPresenter(siteBodyElement, siteMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel, handleStatsClick);


render(siteHeaderElement, new RankUserView(filter[FilterType.HISTORY](filmsModel.getFilms())), RenderPosition.BEFOREEND);

filterPresenter.init();
boardPresenter.init();

render(footerStatisticsElement, new AmountFilmsView(), RenderPosition.BEFOREEND);
