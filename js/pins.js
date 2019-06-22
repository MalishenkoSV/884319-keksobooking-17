// pins.js
'use strict';
(function () {
  /**
 * Создает и отрисовывает обьявление на карте
 * @param {object} pinData -- данные обьекта обьявления для отрисовки пина
 * @return {object} -- элемент с данными о обьявлении
 */

  var createMapPin = function (pinData) {
    if (pinData) {
      var pinCloneElement = window.variables.pinTemplate.cloneNode(true);
      window.variables.pinTemplate.style = 'left:' + pinData.location.x + 'px;top:' + pinData.location.y + 'px;';
      window.variables.pinTemplate.querySelector('img').src = pinData.author.avatar;
      window.variables.pinTemplate.querySelector('img').alt = pinData.offer.type;
    }
    return pinCloneElement;
  };

  /**
 * Показать пины на карте
 * @param {Array} offerDatas - массив обьектов обьявлений
 */
  var showPinsOnMap = function (offerDatas) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offerDatas.length; i++) {
      var dataElement = createMapPin(offerDatas[i]);
      fragment.appendChild(dataElement);
    }
    window.variables.mapListPinElement.appendChild(fragment);
  };
  window.pins = {
    showPinsOnMap: showPinsOnMap
  };
})();
