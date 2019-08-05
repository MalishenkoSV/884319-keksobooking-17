// page.js
'use strict';
(function () {
  var MAX_ADS = 5;
  var ENTER_KEYCODE = 13;
  var MapSize = {
    WIDTH_MIN: 0,
    WIDTH_MAX: 1200,
    HEIGHT_MIN: 130,
    HEIGHT_MAX: 630,
    HEIGHT_MAP: 750
  };
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 81
  };
  var pinStatusCoordsInit = {
    x: Math.round(MapSize.WIDTH_MAX / 2 - MainPinSize.WIDTH / 2),
    y: Math.round(MapSize.HEIGHT_MAP / 2 - MainPinSize.HEIGHT)
  };
  var Border = {
    LEFT: 0,
    RIGHT: Math.round(MapSize.WIDTH_MAX - MainPinSize.WIDTH),
    TOP: MapSize.HEIGHT_MIN,
    BOTTOM: Math.round(MapSize.HEIGHT_MAX - MainPinSize.HEIGHT)
  };

  var mainPin = document.querySelector('.map__pin--main');
  var filtersContainer = document.querySelector('.map__filters');
  var onEnterKeyDownActiveMap = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.form.setAddressCoords(pinStatusCoordsInit.x, pinStatusCoordsInit.y);
      onMapActive();
    }
    mainPin.removeEventListener('keydown', onEnterKeyDownActiveMap);
  };
  var isBookingMapActive = false;
  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };
  var initMap = function () {
    mainPin.addEventListener('mouseup', onMapActive);
    mainPin.addEventListener('keydown', onEnterKeyDownActiveMap);
  };
  var destroyMap = function () {
    mainPin.removeEventListener('mouseup', onMapActive);
  };
  /**
   *  Деактивация страницы
   */
  var onMapDeactivate = function () {
    isBookingMapActive = false;
    var pins = window.form.map.querySelectorAll('.map__pin--all');
    window.preens.resetActivePin();
    window.card.close();
    removePins(pins);
    window.form.onMapReset();
    initMap();
    window.form.setAddressCoords(MapSize.WIDTH_MAX / 2, MapSize.HEIGHT_MAX / 2);
    mainPin.addEventListener('keydown', onMapActive);
  };
  onMapDeactivate();
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
    removePins();
    window.card.close();
    window.preens.onMapShowPins(window.filter.applyFilters(window.util.mixArray(ads)).slice(0, MAX_ADS));
  };
  /**
   * Функция активации страницы
   */
  var onMapActive = function () {
    isBookingMapActive = true;
    window.form.enable();
    window.form.unlock();
    window.util.debounce(onMapChangePins());
    window.backend.load(onLoad, window.popup.onErrorShowMessage);
    destroyMap();
    mainPin.removeEventListener('keydown', onMapActive);
  };
  filtersContainer.addEventListener('change', onMapChangePins);

  /**
   * Функция определения движения при нажатии мыши
   * @param {'mousedown'} нажатие
   * @param {object} mousedownEvt - начальные координаты
   */
  mainPin.addEventListener('mousedown', function (mousedownEvt) {
    if (!isBookingMapActive) {
      onMapActive();
    }
    var pinStatusCoords = {
      x: Math.round(MapSize.WIDTH_MAX / 2 - MainPinSize.WIDTH / 2),
      y: Math.round(MapSize.HEIGHT_MAP / 2 - MainPinSize.HEIGHT)
    };
    var startCoords = {
      x: mousedownEvt.clientX,
      y: mousedownEvt.clientY
    };

    /**
     * Функция движения и координаты смещения
     * @param {object}  mouseMoveEvt нажатие
     */
    var onMouseMove = function (mouseMoveEvt) {
      var shift = {
        x: startCoords.x - mouseMoveEvt.clientX,
        y: startCoords.y - mouseMoveEvt.clientY
      };

      startCoords = {
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
        pinStatusCoords.x = pinCoords.x + Math.round(MainPinSize.WIDTH / 2);
      }
      if (pinCoords.y >= Border.TOP && pinCoords.y <= Border.BOTTOM) {
        mainPin.style.top = pinCoords.y + 'px';
        pinStatusCoords.y = pinCoords.y + MainPinSize.HEIGHT;
      }
      window.form.setAddressCoords(pinStatusCoords.x, pinStatusCoords.y);
    };
      /**
       * Функция поднятия руки с мышки и прекращение движения
       * определение координат пина и удаление обработчиков
       * добавление обработчиковll
       * @param{object} upEvt
       */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.setAddressCoords(pinStatusCoords.x, pinStatusCoords.y);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  window.page = {
    onMapDeactivate: onMapDeactivate,
    onMapChangePins: onMapChangePins,
    isBookingMapActive: isBookingMapActive
  };
})();
