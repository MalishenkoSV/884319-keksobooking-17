// pin.js
'use strict';
(function () {
  /**
 * Создает и отрисовывает обьявление на карте
 * @param {object} pinData -- данные обьекта обьявления для отрисовки пина
 * @return {object} -- элемент с данными о обьявлении
 */
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var createMapPin = function (pinData) {
    if (pinData) {
      var pinCloneElement = pinTemplate.cloneNode(true);
      pinTemplate.style = 'left:' + pinData.location.x + 'px;top:' + pinData.location.y + 'px;';
      pinTemplate.querySelector('img').src = pinData.author.avatar;
      pinTemplate.querySelector('img').alt = pinData.offer.avatar;
    }
    return pinCloneElement;
  };

  /**
 * Покакзать пины на карте
 * @param{Array} adsDatas - массив обьектов обьявлений
 */
  var showPinsOnMap = function (adsDatas) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adsDatas.length; i++) {
      var element = createMapPin(adsDatas[i]);
      fragment.appendChild(element);
      document.querySelector('.map__pins').appendChild(fragment);
    }
  };
  window.pins = {
    showPinsOnMap: showPinsOnMap
  };
})();
