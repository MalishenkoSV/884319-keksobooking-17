// map.js
'use strict';
(function () {
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH = 630;
  var MAP_HEIGTH_MAX = 750;
  var DEBOUNCE_INTERVAL = 500;
  var map = document.querySelector('.map');
  var pins = map.querySelectorAll('.map__pin--all');
  var filters = document.querySelector('.map__filters');
  // var avatarChooser = window.form.formAdress.querySelector('#avatar');
  // var photoChooser = window.form.formAdress.querySelector('#images');
  // var avatarPreview = window.form.formAdress.querySelector('.notice__preview').querySelector('img');
  // var photoPreview = window.form.formAdress.querySelector('.form__photo-container');
  // var photos = [];
  /**
   * Функция определения координаты адресса пина
   * @param {number} x - по горизонтали,
   * @param {number} y - по вертикали
   */
  var setAddressCoords = function (x, y) {
    window.variables.formAdress.querySelector('#address').value = x + ', ' + y;
  };
  var removePins = function () {
    pins.forEach(function (pin) {
      pin.remove();
    });
  };
  var mapActive = false;
  /**
   *  Деактивация страницы
   */
  var onPageDeactivate = function () {
    mapActive = false;
    setAddressCoords(MAP_WIDTH / 2, MAP_HEIGTH_MAX / 2);
    window.variables.formAdress.reset();
    window.pin.resetActivePin();
    window.card.closeCard();
    window.form.deactivateForm();
    removePins();
  };
  onPageDeactivate();
  window.variables.resetForm.addEventListener('click', onPageDeactivate);

  /**
   *  Деактивация страницы
   */
  var ads = [];
  var onLoad = function (data) {
    ads = data;
  };
  window.backend.load(onLoad, window.popup.onErrorShowMessage);


  var updateAds = function () {
    var filterType = filters.value;
    var adsForShow = window.filter.getFilteredData(ads, 'type', filterType);
    // removePins();
    removePins('.map__pin--all');
    window.pin.showPinOnMap(adsForShow);
    window.card.closeCard();
  };
  filters.addEventListener('change', function () {
    window.util.debounce(updateAds, DEBOUNCE_INTERVAL);
  });

  /**
   * Функция активации страницы
   */

  var activatePage = function () {
    mapActive = true;
    updateAds();
    setAddressCoords(MAP_WIDTH / 2, MAP_HEIGTH / 2);
    window.form.activateForm();
    // Разрешает мультизагрузку файлов
    // photoChooser.multiple = 'multiple';
  };
  window.map = {
    isActive: mapActive,
    activatePage: activatePage,
    onPageDeactivate: onPageDeactivate,
    setAddressCoords: setAddressCoords
  };
})();
