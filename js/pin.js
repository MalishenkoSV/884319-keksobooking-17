// pin.js
'use strict';
(function () {
  var activePin = document.querySelector('.' + 'map__pin--active');
  /**
   * Делает выбранный пин активным
   * @param {HTMLElement} selectedPin - selected pin DOM element
   */
  var onPinSetActive = function (selectedPin) {
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    selectedPin.classList.add('map__pin--active');
    activePin = selectedPin;
  };
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
        mapPinTemplate.addEventListener('click', onPinSetActive);
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
      activePin.classList.remove('map__pin--active');
    }
  };

  window.pin = {
    showPinOnMap: window.util.debounce(showPinOnMap),
    resetActivePin: resetActivePin
  };
})();
