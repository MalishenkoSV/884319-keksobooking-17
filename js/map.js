// map.js
'use strict';
(function () {
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH = 630;
  var MAP_HEIGTH_MAX = 750;
  var map = document.querySelector('.map');
  var pins = map.querySelectorAll('.map__pin--all');
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
  /**
   *  Деактивация страницы
   */
  var deactivatePage = function () {
    setAddressCoords(MAP_WIDTH / 2, MAP_HEIGTH_MAX / 2);
    window.variables.formAdress.reset();
    window.pin.resetActivePin();
    if (window.map.card) {
      window.map.card.remove();
    }
    window.form.deactivateForm();
    pins.forEach(function (pin) {
      pin.remove();
    });
  };
  window.variables.resetForm.addEventListener('click', deactivatePage);

  /**
   *  Деактивация страницы
   */
  var ads = [];
  var onLoad = function (data) {
    ads = data;
  };
  window.backend.load(onLoad, window.popup.showErrorMessage);

  /**
   *  Фильтрует объявления и создает массив отфильтрованных объявлений
   */
  var filtersContainer = document.querySelector('.map__filters-container');
  var filters = filtersContainer.querySelectorAll('.map__filter');
  var DEBOUNCE_INTERVAL = 500;
  var getFilteredData = function (data, dataParam, value) {
    if (value !== 'any') {
      return (data.filter(function (it) {
        return it.offer[dataParam] === value;
      }));
    } else {
      return data.slice(0, 5);
    }
  };
  var updateAds = function () {
    var filterType = filters.value;
    var adsForShow = getFilteredData(ads, 'type', filterType);
    window.pin.showPinOnMap(adsForShow);
    if (window.map.card) {
      window.map.card.onClickCloseBtn();
    }
    pins.forEach(function (pin) {
      pin.remove();
    });
  };
  filters.addEventListener('change', function () {
    window.util.debounce(updateAds, DEBOUNCE_INTERVAL);
  });
  /**
   * Функция активации страницы
   */
  var activatePage = function () {
    updateAds();
    setAddressCoords(MAP_WIDTH / 2, MAP_HEIGTH / 2);
    window.form.activateForm();
    // Разрешает мультизагрузку файлов
    // photoChooser.multiple = 'multiple';
  };
  window.map = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
    setAddressCoords: setAddressCoords
  };
})();
