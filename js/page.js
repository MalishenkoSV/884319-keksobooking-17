// page.js
'use strict';
(function () {
  var MAX_ADS = 5;
  var ENTER_KEYCODE = 13;
  var MapSize = {
    WIDTH_MIN: 0,
    WIDTH_MAX: 1200,
    HEIGHT: 750,
    HEIGHT_MIN: 130,
    HEIGHT_MAX: 630
  };
  var MainPinSize = {
    WIDTH: 64,
    HEIGHT: 80,
    RADIUS: 32
  };
  var filtersContainer = document.querySelector('.map__filters');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  /**
  * заполняет поле координатами передвинутой метки
  */
  var pinStatusCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };
  window.form.setAddressCoords(pinStatusCoords.x, pinStatusCoords.y);


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
  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };
  var onFormDeactivateMap = function () {
    isBookingMapActive = false;
    map.classList.add('map--faded');
    var pins = map.querySelectorAll('.map__pin--all');
    window.preens.resetActivePin(pins);
    removePins();
    window.card.close();
    window.form.disableMap();
    initMap();
    window.form.onFormReset();
    window.form.setAddressCoords(MapSize.WIDTH_MAX / 2, MapSize.HEIGHT_MAX / 2);
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
    removePins();
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
  filtersContainer.addEventListener('change', onMainPinClick);
  /**
   * Функция определения движения при нажатии мыши
   * @param {'mousedown'} нажатие
   * @param {object} mousedownEvt - начальные координаты
   */
  mainPin.addEventListener('mousedown', function (mousedownEvt) {
    mousedownEvt.preventDefault();
    if (!isBookingMapActive) {
      onMainPinClick();
    }

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

      var border = {
        left: MapSize.WIDTH_MIN - MainPinSize.RADIUS,
        right: MapSize.WIDTH_MAX - MainPinSize.RADIUS,
        top: MapSize.HEIGHT_MIN,
        bottom: MapSize.HEIGHT_MAX
      };
      if (pinCoords.x >= border.left && pinCoords.x < border.right) {
        mainPin.style.left = pinCoords.x + 'px';
        pinStatusCoords.x = pinCoords.x + MainPinSize.RADIUS;
      }
      if (pinCoords.y >= border.top && pinCoords.y < border.bottom) {
        mainPin.style.top = pinCoords.y + 'px';
        pinStatusCoords.y = pinCoords.y + MainPinSize.HEIGHT;
      }
      window.form.setAddressCoords(pinStatusCoords.x, pinStatusCoords.y);
    };

      /**
       * Функция поднятия руки с мышки и прекращение движения
       * определение координат пина и удаление обработчиков
       * добавление обработчиковll
       * @param {object} upEvt
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
    initMap: initMap,
    map: map,
    onMainPinClick: onMainPinClick,
    onFormDeactivateMap: onFormDeactivateMap,
    onMapChangePins: onMapChangePins,
    isBookingMapActive: isBookingMapActive,
    MainPinSize: MainPinSize,
    pinStatusCoords: pinStatusCoords
  };
})();
