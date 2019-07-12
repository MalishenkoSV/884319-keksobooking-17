// map.js
'use strict';
(function () {
  /**
   * Функция определения координаты адресса пина
   * @param {number} x - по горизонтали,
   * @param {number} y - по вертикали
   */
  var setAddressCoords = function (x, y) {
    window.variables.formAdress.querySelector('#address').value = x + ', ' + y;
  };
  /**
  *  Дезактивация страницы
  */
  var deactivePage = function () {
    window.variables.fieldsetList.forEach(function () {
      window.variables.fieldsetList.disabled = true;
    });
    setAddressCoords(window.variables.MAP_WIDTH / 2, window.variables.MAP_HEIGTH_MAX / 2);
    window.variables.formAdress.reset();
    window.pin.resetActivePin();
    window.variables.map.classList.add('map--faded');
    window.variables.formAddress.classList.add('ad-form--disabled');
    window.variables.cards.forEach(function (element) {
      if (!element.classList.contains('hidden')) {
        element.classList.add('hidden');
      }
    });
  };
  window.variables.resetForm.addEventListener('click', deactivePage);


  var onLoad = function (data) {
    var adverts = [];
    adverts = data.slice();
    adverts.forEach(function (i) {
      adverts.push(adverts[i]);
    });
    window.pin.showPinOnMap(adverts);
  };
  var fetchAds = function () {
    window.backend.load(onLoad, window.error.onError);
  };
  /**
   * Функция активации страницы при клике на главную метку
   */

  var activatePage = function () {
    if (window.variables.map.classList.contains('map--active')) {
      return;
    }
    window.variables.fieldsetList.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
    fetchAds();
    setAddressCoords(window.variables.MAP_WIDTH / 2, window.variables.MAP_HEIGTH / 2);
    window.form.activeForm();
    window.variables.mainPin.removeEventListener('mouseup', activatePage);
  };
  window.variables.mainPin.addEventListener('mouseup', activatePage);
  window.map = {
    activate: activatePage,
    deactive: deactivePage,
    setAddressCoords: setAddressCoords
  };
})();
