// Ads.js
'use strict';
(function () {
  var COUNT = 8;
  var TYPES = ['place', 'flat', 'house', 'bungalo'];
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH_MIN = 130;
  var MAP_HEIGTH_MAX = 630;
  /**
 * Создает обьект
 * @return {object} -- объект данных о объявлении
 */
  var createData = function () {
    var advertData = {
      author: {
        avatar: 'img/avatars/user0' + window.util.getRandomFromInterval(1, COUNT) + '.png'
      },
      offer: {
        type: window.util.getRandomElementFromArray(TYPES)
      },
      location: {
        x: window.util.getRandomFromInterval(0, MAP_WIDTH),
        y: window.util.getRandomFromInterval(MAP_HEIGTH_MIN, MAP_HEIGTH_MAX)
      }
    };
    return advertData;
  };

  /**
 * Создает массив обьектов обьявлений
 */
  var getAdverts = function () {
    var adverts = [];
    for (var i = 0; i < COUNT; i++) {
      var advert = createData(i);
      adverts.push(advert);
    }
  };

  window.ads = {
    getAdverts: getAdverts
  };
})();
