// pin.js
'use strict';
(function () {
  /**
   * Создает и отрисовывает объявление на карте
   * @param {object} pinData -- данные объекта объявления для отрисовки пина
   * @return {object} -- элемент с данными о объявлении
   */

  var createMapPin = function (pinData) {
    if (pinData) {
      var pinCloneElement = window.variables.pinTemplate.cloneNode(true);
      if (pinData.address) {
        window.variables.pinTemplate.style = 'left:' + pinData.location.x + 'px;top:' + pinData.location.y + 'px;';
      } else {
        window.variables.pinTemplate.remove();
      }
      if (pinData.author) {
        window.variables.pinTemplate.querySelector('img').src = pinData.author.avatar;
      } else {
        window.variables.pinTemplate.remove();
      }
      if (pinData.offer) {
        window.variables.pinTemplate.querySelector('img').alt = pinData.offer.type;
      } else {
        window.variables.pinTemplate.remove();
      }
    }
    // window.variables.mapPinTemplate.addEventListener('click', function () {
    //   window.card.showCardOnMap(pinData);
    //   window.variables.mapPinTemplate.classList.add('map__pin--active');
    // });
    return pinCloneElement;
  };

  /**
   * Показать пины на карте
   * @param {Array} offers - массив объектов объявлений
   */
  var showPinOnMap = function (offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.variables.COUNT; i++) {
      var dataElement = createMapPin(offers[i]);
      fragment.appendChild(dataElement);
    }
    window.variables.mapListPinElement.appendChild(fragment);
  };
  window.pin = {
    showPinOnMap: showPinOnMap
  };
})();
