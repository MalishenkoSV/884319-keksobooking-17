// pin.js
'use strict';
(function () {
  var PIN_ACTIVE_CLASS = 'map__pin--active';
  var PIN_MAIN_CLASS = 'map__pin--main';
  var activePin = document.querySelector('.' + PIN_ACTIVE_CLASS);
  /**
   * Создает и отрисовывает объявление на карте
   * @param {object} advertData -- данные объекта объявления для отрисовки пина
   * @return {object} -- элемент с данными о объявлении
   */
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var createMapPin = function (advertData) {
    var mapPinTemplate = pinTemplate.cloneNode(true);
    if (advertData) {
      mapPinTemplate.style = 'left:' + advertData.location.x + 'px; top:' + advertData.location.y + 'px;';
      mapPinTemplate.querySelector('img').src = advertData.author.avatar;
      mapPinTemplate.querySelector('img').alt = advertData.offer.title;
      mapPinTemplate.addEventListener('click', function () {
        window.card.showOnMap(advertData);
      });
    }
    return mapPinTemplate;
  };
  /**
   * Показать пины на карте
   * @param {Array} offers - массив объектов объявлений
   */
  var showPinOnMap = function (offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var pin = createMapPin(offers[i]);
      fragment.appendChild(pin);
    }
    window.variables.map.appendChild(fragment);
  };
  /**
   * Сброс активации пинов
   */
  var resetActivePin = function () {
    if (activePin) {
      activePin.classList.remove(PIN_ACTIVE_CLASS);
    }
  };

  /**
   * Показать пины на карте
   * @param {Array} element  - элемент
   */
  var setActivePin = function (element) {
    if (element.classList.contains(PIN_MAIN_CLASS)) {
      return;
    }

    if (activePin && element !== activePin) {
      activePin.classList.remove(PIN_ACTIVE_CLASS);
    }

    element.classList.add(PIN_ACTIVE_CLASS);
    activePin.addEventListener('keydown', window.card.showCardOnMaps);
  };
  window.variables.pin.addEventListener('focus', window.card.setActivePin);
  window.pin = {
    showPinOnMap: window.util.debounce(showPinOnMap),
    setActivePin: setActivePin,
    resetActivePin: resetActivePin
  };
})();
