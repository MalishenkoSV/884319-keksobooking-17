// page.js
'use strict';
(function () {
  var MAX_ADS = 5;
  var ENTER_KEYCODE = 13;
  var MapSize = {
    WIDTH_MIN: 0,
    WIDTH_MAX: 1200,
    HEIGHT_MIN: 130,
    HEIGHT_MAX: 630
  };
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 81,
    RADIUS: 32
  };
  var Border = {
    LEFT: 0,
    RIGHT: Math.round(MapSize.WIDTH_MAX - MainPinSize.RADIUS),
    TOP: MapSize.HEIGHT_MIN,
    BOTTOM: Math.round(MapSize.HEIGHT_MAX - MainPinSize.RADIUS)
  };
  var filtersContainer = document.querySelector('.map__filters');
  var addressInput = document.querySelector('#address');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var pinStatusCoordsInit = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop,
  };
  var setAddressCoords = function (coords) {
    addressInput.value = coords.x + ', ' + coords.y;
    addressInput.defaultValue = addressInput.value;
  };
  setAddressCoords(pinStatusCoordsInit.x, pinStatusCoordsInit.y);
  var onEnterKeyDownActiveMap = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onMainPinClick();
    }
    mainPin.removeEventListener('keydown', onEnterKeyDownActiveMap);
  };
  var isBookingMapActive = false;
  var initMap = function () {
    mainPin.addEventListener('keydown', onMainPinClick);
    mainPin.addEventListener('mouseup', onMainPinClick);
    mainPin.addEventListener('keydown', onEnterKeyDownActiveMap);
  };
  var destroyMap = function () {
    mainPin.removeEventListener('mouseup', onMainPinClick);
  };

  /**
   *  Деактивация страницы
   */
  var onFormDeactivateMap = function () {
    isBookingMapActive = false;
    map.classList.add('map--faded');
    var pins = map.querySelectorAll('.map__pin--all');
    window.preens.resetActivePin();
    window.card.close();
    window.form.disableMap();
    initMap();
    window.form.onFormDeactivate(pins);
    setAddressCoords(pinStatusCoordsInit.x, pinStatusCoordsInit.y);
  };
  onFormDeactivateMap();
  /**
   *  Загрузка данных
   *@param {array} data - данные из сервера
   */
  var ads = [];
  var onLoad = function (data) {
    ads = data;
    onMapChangePins(ads);
  };

  /**
   * Обновление загруженных данных и показ на карте
   * @param{array} ads обьявлений
   */
  var onMapChangePins = function () {
    window.form.removePins();
    window.card.close();
    window.preens.onMapShowPins(window.filter.applyFilters(window.util.mixArray(ads)).slice(0, MAX_ADS));
  };
  /**
   * Функция активации страницы
   */
  var onMainPinClick = function () {
    isBookingMapActive = true;
    map.classList.remove('map--faded');
    window.form.enable();
    window.form.unlock();
    window.util.debounce(onMapChangePins());
    window.backend.load(onLoad, window.popup.onErrorShowMessage);
    destroyMap();
    mainPin.removeEventListener('keydown', onMainPinClick);
  };
  filtersContainer.addEventListener('change', onMapChangePins);
  /**
   * Функция определения движения при нажатии мыши
   * @param {'mousedown'} нажатие
   * @param {object} mousedownEvt - начальные координаты
   */
  mainPin.addEventListener('mousedown', function (mousedownEvt) {
    if (!isBookingMapActive) {
      onMainPinClick();
    }
    // запомним координаты начальные
    var startCoords = {
      x: mousedownEvt.clientX,
      y: mousedownEvt.clientY
    };
    var getPinCoords = function (height) {
      return {
        x: mainPin.offsetLeft + MainPinSize.RADIUS,
        y: mainPin.offsetTop + height,
      };
    };
    /**
     * Функция движения и координаты смещения
     * @param {object}  mouseMoveEvt нажатие
     */
    var onMouseMove = function (mouseMoveEvt) {
      // смещение
      var shift = {
        x: startCoords.x - mouseMoveEvt.clientX,
        y: startCoords.y - mouseMoveEvt.clientY
      };

      var pinStatusCoords = {
        x: mouseMoveEvt.clientX,
        y: mouseMoveEvt.clientY
      };

      var pinCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      /**
       * Определение ограничений пина и координаты пина
       * @param {object}  mouseMoveEvt нажатие
       */

      if (pinCoords.x >= Border.LEFT && pinCoords.x <= Border.RIGHT) {
        mainPin.style.left = pinCoords.x + 'px';
        pinStatusCoords.x = pinCoords.x - MainPinSize.RADIUS;
      }
      if (pinCoords.y >= Border.TOP && pinCoords.y <= Border.BOTTOM) {
        mainPin.style.top = pinCoords.y + 'px';
        pinStatusCoords.y = pinCoords.y - MainPinSize.RADIUS;
      }
      // var x = Math.min(Math.max(pinCoords.x, Border.LEFT), Border.RIGHT);
      // var y = Math.min(Math.max(pinCoords.y, Border.TOP), Border.BOTTOM);
      // renderPin(x, y);
      setAddressCoords(getPinCoords(MainPinSize.RADIUS));
    };
      /**
       * Функция поднятия руки с мышки и прекращение движения
       * определение координат пина и удаление обработчиков
       * добавление обработчиковll
       * @param{object} upEvt
       */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setAddressCoords(getPinCoords(MainPinSize.HEIGHT));
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  window.page = {
    initMap: initMap,
    map: map,
    onMainPinClick: onMainPinClick,
    onFormDeactivateMap: onFormDeactivateMap,
    onMapChangePins: onMapChangePins,
    isBookingMapActive: isBookingMapActive,
    pinStatusCoordsInit: pinStatusCoordsInit,
    setAddressCoords: setAddressCoords
  };
})();
