// map.js
'use strict';
(function () {
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH = 630;
  var MAP_HEIGTH_MAX = 750;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
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
  var pins = [];
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
    mainPin.addEventListener('mouseup', activatePage);
  };
  window.variables.resetForm.addEventListener('keydown', deactivatePage);

  /**
   *  Деактивация страницы
   */
  var adverts = [];
  var onLoad = function (data) {
    adverts = data.slice();
    // var offers = window.filter.filterAds(adverts);
    window.pin.showPinOnMap(adverts);
  };

  var fetchAds = function () {
    window.backend.load(onLoad, window.popup.onError);
  };
  /**
   * updateMap - Перерисовывает элементы 'Метка объявления' на основе
   * отфильтрованных объявлений.
   *
   */
  var ads = [];
  var updateMap = function () {
    // Закрывает открытый элемeнт 'Карточка объявления'
    if (window.map.card) {
      window.map.card.close();
    }
    // Удаляет существующие элементы 'Метка объявления'
    pins.forEach(function (pin) {
      pin.remove();
    });

    // 'Перемешивает' массив объявлений случайным обазом, чтобы при выборе опции 'любой'
    // отображались случайные элементы
    ads = window.util.mixArray(fetchAds(adverts));

    // Фильтрует объявления и создает массив отфильтрованных объявлений
    var filteredAds = window.filter.filterAds(ads);

    // Добавляет DOM-элементы 'Метка объявления' на страницу
    window.pin.showPinOnMap(filteredAds(pins));
  };
  /**
   * Функция активации страницы при клике на главную метку
   */
  var activatePage = function () {
    updateMap();
    setAddressCoords(MAP_WIDTH / 2, MAP_HEIGTH / 2);
    window.form.activateForm();
    // Разрешает мультизагрузку файлов
    // photoChooser.multiple = 'multiple';
    mainPin.removeEventListener('mouseup', activatePage);
  };
  window.map = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
    setAddressCoords: setAddressCoords,
    updateMap: updateMap
  };
})();
