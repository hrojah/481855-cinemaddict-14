import RankUserView from './view/rank-user';
import MenuNavView from './view/menu-nav';
import AmountFilmsView from './view/amount-films';
import {generateFilm} from './mock/film';
import {generateFilter} from './mock/filter';
import {render, RenderPosition} from './utils/render';
import BoardPresenter from './presenter/board';

const FILM_COUNT = 20;
const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const boardPresenter = new BoardPresenter(siteBodyElement, siteMainElement);


render(siteHeaderElement, new RankUserView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuNavView(filters), RenderPosition.BEFOREEND);
boardPresenter.init(films);

render(footerStatisticsElement, new AmountFilmsView(), RenderPosition.BEFOREEND);
