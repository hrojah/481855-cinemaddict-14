const createRank = (filter) => {
  const history = filter.find(item => item.name === 'History');
  const filmsCount = history.count;
  switch (true) {
    case filmsCount === 0:
      return ''
      break;
    case filmsCount >= 0 && filmsCount <= 10:
      return '<p class="profile__rating">Novice</p>'
      break;
    case filmsCount >= 10 && filmsCount <= 20:
      return '<p class="profile__rating">Fun</p>'
      break;
    case filmsCount > 20:
      return '<p class="profile__rating">Movie Buff</p>'
      break;
  }
}
export const createRankUserTemplate = (filter) => {
  return `<section class="header__profile profile">
       ${createRank(filter)}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
