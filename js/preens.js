// preens.js
'use strict';
(function () {
  var PIN_ACTIVE_CLASS = 'map__pin--active';
  var activePin = document.querySelector('.' + PIN_ACTIVE_CLASS);

  /**
   * Сброс активации пинов
   */
  var resetActivePin = function () {
    if (activePin) {
      activePin.classList.remove(PIN_ACTIVE_CLASS);
    } else {
      return;
    }
  };
  /**
   * Делает выбранный пин активным
   * @param{HTMLelement} selectedPin - элемент отрисовки пина
   */
  var setActivePin = function (selectedPin) {
    if (activePin) {
      activePin.classList.remove(PIN_ACTIVE_CLASS);
    }
    selectedPin.classList.add(PIN_ACTIVE_CLASS);
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
    var pinImageElement = mapPinTemplate.querySelector('img');
    if (advertData) {
      mapPinTemplate.style = 'left:' + advertData.location.x + 'px; top:' + advertData.location.y + 'px;';
      pinImageElement.src = advertData.author.avatar;
      pinImageElement.alt = advertData.offer.title;
      mapPinTemplate.addEventListener('click', function () {
        window.card.onMapShowAdd(advertData);
        setActivePin(mapPinTemplate);
      });
    }
    return mapPinTemplate;
  };

  /**
   * Показать пины на карте
   * @param {Array} advertOffers - массив объектов объявлений
   * @param {object} evt
   */
  // var currentTarget;
  var onMapShowPins = function (advertOffers) {
    // var target = evt.target.closest('.map__pin');

    // if (target) {
    //   if (currentTarget) {
    //     currentTarget.classList.remove('map__pin--active');
    //     window.card.close();
    //   }
    //   target.classList.add('map__pin--active');
    //   currentTarget = target;
    // }
    var fragment = document.createDocumentFragment();
    advertOffers.forEach(function (advertOffer) {
      var element = createMapPin(advertOffer);
      fragment.appendChild(element);
    });
    window.page.map.appendChild(fragment);
  };
  window.preens = {
    onMapShowPins: window.util.debounce(onMapShowPins),
    resetActivePin: resetActivePin
  };
})();
