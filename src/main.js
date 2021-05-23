import RankUserView from './view/rank-user';
import AmountFilmsView from './view/amount-films';
import FilterPresenter from './presenter/filter';
import {render, RenderPosition} from './utils/render';
import BoardPresenter from './presenter/board';
import FilmsModel from './model/films';
import FilterModel from './model/filter';
import {filter} from './utils/filter';
import {FilterType, UpdateType} from './const';
import Api from './api';

const AUTHORIZATION = 'Basic c0i4n1e9m4a4';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();

const filterModel = new FilterModel();

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const boardPresenter = new BoardPresenter(siteBodyElement, siteMainElement, filmsModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel, boardPresenter);


render(siteHeaderElement, new RankUserView(filter[FilterType.HISTORY](filmsModel.getFilms())), RenderPosition.BEFOREEND);

filterPresenter.init();
boardPresenter.init();
api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });


render(footerStatisticsElement, new AmountFilmsView(), RenderPosition.BEFOREEND);
