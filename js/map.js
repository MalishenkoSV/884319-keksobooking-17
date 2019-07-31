// map.js
'use strict';
(function () {
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH = 630;
  var MAP_HEIGTH_MAX = 750;
  var MAX_ADS = 5;
  var filtersContainer = document.querySelector('.map__filters');
  /**
   * Функция определения координаты адресса пина
   * @param {number} x - по горизонтали,
   * @param {number} y - по вертикали
   */
  var setAddressCoords = function (x, y) {
    window.variables.formAddress.querySelector('#address').value = x + ', ' + y;
  };
  var removePins = function () {
    var pins = window.variables.map.querySelectorAll('.map__pin--all');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };
  /**
   *  Деактивация страницы
   */
  var onPageDeactivate = function () {
    var pins = window.variables.map.querySelectorAll('.map__pin--all');
    setAddressCoords(MAP_WIDTH / 2, MAP_HEIGTH_MAX / 2);
    window.variables.formAddress.reset();
    window.pin.resetActivePin();
    window.card.close();
    window.form.disable();
    removePins(pins);
  };
  onPageDeactivate();
  window.variables.resetForm.addEventListener('click', onPageDeactivate);

  /**
   *  Загрузка данных
   *@param {array} data - данные из сервера
   */
  var ads = [];
  var onLoad = function (data) {
    ads = data;
  };
  window.backend.load(onLoad, window.popup.onErrorShowMessage);
  /**
   * Обновление загруженных данных и показ на карте
   * @param{array} ads обьявлений
   */
  var onMapChangePins = function () {
    removePins();
    window.card.close();
    window.pin.showPinOnMap(window.filter.applyFilters(window.util.mixArray(ads)).slice(0, MAX_ADS));
  };


  /**
   * Функция активации страницы
   */

  var activatePage = function () {
    setAddressCoords(MAP_WIDTH / 2, MAP_HEIGTH / 2);
    window.form.enable();
    if (window.variables.map.classList.contains('map--active')) {
      return;
    }
    window.util.debounce(onMapChangePins());
    window.variables.map.classList.add('map--active');
  };
  filtersContainer.addEventListener('change', onMapChangePins);
  window.map = {
    activatePage: activatePage,
    onPageDeactivate: onPageDeactivate,
    setAddressCoords: setAddressCoords,
    onMapChangePins: onMapChangePins
  };
})();
