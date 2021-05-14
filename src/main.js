import RankUserView from './view/rank-user';
import AmountFilmsView from './view/amount-films';
import {generateFilm} from './mock/film';
import FilterPresenter from './presenter/filter';
import {render, RenderPosition} from './utils/render';
import BoardPresenter from './presenter/board';
import FilmsModel from './model/films';
import FilterModel from './model/filter';
import {filter} from './utils/filter';
import {FilterType} from './const';

const FILM_COUNT = 20;
const films = new Array(FILM_COUNT).fill().map(generateFilm);

const filmModel = new FilmsModel();
filmModel.setFilms(films);
const filterModel = new FilterModel();


const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const boardPresenter = new BoardPresenter(siteBodyElement, siteMainElement, filmModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmModel);


render(siteHeaderElement, new RankUserView(filter[FilterType.HISTORY](filmModel.getFilms())), RenderPosition.BEFOREEND);
filterPresenter.init();
boardPresenter.init();

render(footerStatisticsElement, new AmountFilmsView(), RenderPosition.BEFOREEND);
