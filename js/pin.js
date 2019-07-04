// pin.js
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
   * @param {Array} offers - массив обьектов обьявлений
   */
  var showPinOnMap = function (offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.variables.NUMBER_PINS; i++) {
      var dataElement = createMapPin(offers[i]);
      fragment.appendChild(dataElement);
    }
    window.variables.mapListPinElement.appendChild(fragment);
  };
  window.pin = {
    showPinOnMap: showPinOnMap
  };
})();
