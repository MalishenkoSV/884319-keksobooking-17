// map.js
'use strict';
(function () {
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH = 630;
  var MAP_HEIGTH_MAX = 750;

  var map = document.querySelector('.map');
  /**
   * Функция определения координаты адресса пина
   * @param {number} x - по горизонтали,
   * @param {number} y - по вертикали
   */
  var setAddressCoords = function (x, y) {
    window.variables.formAdress.querySelector('#address').value = x + ', ' + y;
  };
  var removePins = function () {
    var pins = map.querySelectorAll('.map__pin--all');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };
  var mapActive = false;
  /**
   *  Деактивация страницы
   */
  var onPageDeactivate = function () {
    var pins = map.querySelectorAll('.map__pin--all');
    mapActive = false;
    setAddressCoords(MAP_WIDTH / 2, MAP_HEIGTH_MAX / 2);
    window.variables.formAdress.reset();
    window.pin.resetActivePin();
    window.card.closeCard();
    window.form.deactivateForm();
    removePins(pins);
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


  // var updateAds = function () {
  //   var target = event.target;
  //   if (target.tagName === 'select') {
  //     var filterType = target.value;
  //     var type = target.id;
  //     var adsForShow = window.filter.getFilteredData(ads, type, filterType);
  //   }
  //   removePins();
  //   window.pin.showPinOnMap(adsForShow);
  //   window.card.closeCard();
  // };
  // filters.addEventListener('change', function (evt) {
  //   updateAds(evt.target);
  // });

  /**
   * Функция активации страницы
   */

  var activatePage = function () {
    mapActive = true;
    window.pin.showPinOnMap(ads);
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
