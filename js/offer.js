// Offer.js
'use strict';
(function () {
  /**
 * Создает обьект
 * @return {object} -- объект данных о объявлении
 */
  var createData = function () {
    var advertData = {
      author: {
        avatar: 'img/avatars/user0' + window.util.getRandomFromInterval(1, window.variables.COUNT) + '.png'
      },
      offer: {
        type: window.util.getRandomElementFromArray(window.variables.TYPES)
      },
      location: {
        x: window.util.getRandomFromInterval(0, window.variables.MAP_WIDTH),
        y: window.util.getRandomFromInterval(window.variables.MAP_HEIGTH_MIN, window.variables.MAP_HEIGTH_MAX)
      }
    };
    return advertData;
  };

  /**
   * Создает массив обьектов обьявлений
   * @return {array} adverts - массив обьявлений
   */
  var getAdverts = function () {
    var adverts = [];
    for (var i = 0; i < window.variables.COUNT; i++) {
      var advert = createData(i);
      adverts.push(advert);
    }
    return adverts;
  };

  window.offer = {
    get: getAdverts
  };
})();
