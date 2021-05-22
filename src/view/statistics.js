import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart';
import {createRank} from '../utils/rank';
import {formatDuration} from '../utils/films';
import {BAR_HEIGHT, interval} from '../const';
import {getGenreCounts} from '../utils/common';

dayjs.extend(isBetween);

const renderChart = (ctx, films, dateFrom, dateTo) => {
  const filteredFilms = films.filter((film) => dayjs(film.userDetails.watchingDate).isBetween(dateFrom, dateTo));

  const genres = getGenreCounts(filteredFilms);
  const sortedValues = Object.values(genres).sort((itemA, itemB) => itemB - itemA);
  const sortedKeys = Object.keys(genres).sort((genreA, genreB) => genres[genreB] - genres[genreA]);

  ctx.height = BAR_HEIGHT * sortedKeys.length;

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: sortedKeys,
      datasets: [{
        data: sortedValues,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticTemplate = (data, int) => {
  const {films, dateFrom, dateTo} = data;

  const filteredFilms = films.filter((film) => dayjs(film.userDetails.watchingDate).isBetween(dateFrom, dateTo));

  const genres = getGenreCounts(filteredFilms);

  const getTopGenre = (filteredFilms) => {

    if (!filteredFilms.length) {
      return '';
    }

    const sortedKeys = Object.keys(genres).sort((genreA, genreB) => genres[genreB]  - genres[genreA]);
    return sortedKeys[0];
  };

  const getDuration = (films) => {
    let duration = 0;
    for (let i = 0; i < films.length; i++) {
      duration += films[i].filmInfo.runtime;
    }
    return formatDuration(duration);
  };

  const duration = getDuration(filteredFilms);

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${createRank(films)}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${int === interval.ALL_TIME ? 'checked' : ''}>
      <label for="statistic-all-time" class="statistic__filters-label" id="all-time">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${int === interval.TODAY ? 'checked' : ''}>
      <label for="statistic-today" class="statistic__filters-label" id="today">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${int === interval.WEEK ? 'checked' : ''}>
      <label for="statistic-week" class="statistic__filters-label" id="week">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${int === interval.MONTH ? 'checked' : ''}>
      <label for="statistic-month" class="statistic__filters-label" id="month">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${int === interval.YEAR ? 'checked' : ''}>
      <label for="statistic-year" class="statistic__filters-label" id="year">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${filteredFilms.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${duration.hours} <span class="statistic__item-description">h</span> ${duration.minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${getTopGenre(filteredFilms)}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`;
};

export default class Statistics extends SmartView {
  constructor(films) {
    super();
    this._data = {
      films,
      dateFrom: (() => {
        const years = 100;
        return dayjs().subtract(years, 'year').toDate();
      })(),
      dateTo: dayjs().toDate(),
    };

    this._chart = null;
    this._interval = interval.ALL_TIME;
    this._intervalChangeHandler = this._intervalChangeHandler.bind(this);
    this._setCharts();
    this.setInterval();
  }

  getTemplate() {
    return createStatisticTemplate(this._data, this._interval);
  }

  restoreHandlers() {
    this._setCharts();
    this.setInterval();
  }

  _intervalChangeHandler(evt) {
    this._interval = evt.target.id;
    switch (evt.target.id) {
      case interval.TODAY:
        this.updateDate({
          dateFrom: (() => {
            const day = 1;
            return dayjs().subtract(day, 'day').toDate();
          })(),
        });
        break;
      case interval.WEEK:
        this.updateDate({
          dateFrom: (() => {
            const day = 7;
            return dayjs().subtract(day, 'day').toDate();
          })(),
        });
        break;
      case interval.MONTH:
        this.updateDate({
          dateFrom: (() => {
            const month = 1;
            return dayjs().subtract(month, 'month').toDate();
          })(),
        });
        break;
      case interval.YEAR:
        this.updateDate({
          dateFrom: (() => {
            const year = 1;
            return dayjs().subtract(year, 'year').toDate();
          })(),
        });
        break;
      default:
        this.updateDate({
          dateFrom: (() => {
            const year = 100;
            return dayjs().subtract(year, 'year').toDate();
          })(),
        });
        break;
    }
  }

  setInterval() {
    this.getElement().querySelectorAll('.statistic__filters-label').forEach((item) => {
      item.addEventListener('click', this._intervalChangeHandler);
    });
  }

  _setCharts() {
    if (this._chart !== null) {
      this._chart = null;
    }

    const {films, dateFrom, dateTo} = this._data;
    const ctx = this.getElement().querySelector('.statistic__chart');

    this._chart = renderChart(ctx, films, dateFrom, dateTo);
  }

  removeElement() {
    super.removeElement();

    if (this._chart !== null) {
      this._chart = null;
    }
  }
}
