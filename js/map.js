// map-manage.js
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
    window.variables.mapListElement.classList.add('map--faded');
    window.variables.formAddress.classList.add('ad-form--disabled');
  };
  /**
   * Функция активации страницы
   */
  // var activatePage = function () {
  //   window.form.activeForm();
  //   window.variables.fieldsetList.forEach(function (fieldset) {
  //     fieldset.disabled = false;
  //   });
  //   window.form.setAddressCoords(window.variables.MAP_WIDTH / 2, window.variables.MAP_HEIGTH_MAX / 2);
  //   if (!activatePage) {
  //     window.pin.showPinOnMap();
  //   }
  //   window.variables.mainPin.removeEventListener('mouseup', activatePage);
  // };
  var activatePage = function () {
    window.form.activeForm();
    var onLoad = function (data) {
      window.pin.showPinsOnMap(data);
    };
    window.backend.load(onLoad, window.error.onError);
    window.form.setAddress(window.variables.MAP_WIDTH / 2, window.variables.MAP_HEIGTH / 2);
    window.variables.mainPin.removeEventListener('mouseup', activatePage);
  };
  /**
   * Функция активации страницы при клике на главную метку
   */
  window.variables.mainPin.addEventListener('mouseup', activatePage);
  window.map = {
    activate: activatePage,
    deactive: deactivePage,
    setAddressCoords: setAddressCoords
  };
})();
