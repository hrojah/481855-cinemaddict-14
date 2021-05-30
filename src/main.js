import FilterPresenter from './presenter/filter';
import BoardPresenter from './presenter/board';
import FilmsModel from './model/films';
import FilterModel from './model/filter';
import {UpdateType} from './const';
import Api from './api/api';
// import Store from './api/store';
// import Provider from './api/provider';

const AUTHORIZATION = 'Basic c0i4n1e9m4a4';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';
// const STORE_PREFIX = 'cinemaddict-localstorage';
// const STORE_VER = 'v14';
// const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;


const api = new Api(END_POINT, AUTHORIZATION);
// const store = new Store(STORE_NAME, window.localStorage);
// const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();

const filterModel = new FilterModel();

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const boardPresenter = new BoardPresenter(siteBodyElement, siteMainElement, filmsModel, filterModel, api, footerStatisticsElement, siteHeaderElement);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel, boardPresenter);

filterPresenter.init();
boardPresenter.init();
api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

// window.addEventListener('load', () => {
//   navigator.serviceWorker.register('/sw.js');
// });

// window.addEventListener('online', () => {
//   document.title = document.title.replace(' [offline]', '');
//   apiWithProvider.sync();
// });
//
// window.addEventListener('offline', () => {
//   document.title += ' [offline]';
// });
