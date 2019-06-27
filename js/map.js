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
   * активация формы
   * разблокирование полей формы
   * определение координаты метки
   * активация страницы по клику
   */
  var activatePage = function () {
    window.form.activeForm();
    window.variables.fieldsetList.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
    setAddressCoords(window.variables.MAP_WIDTH / 2, window.variables.MAP_HEIGTH_MAX / 2);
    window.variables.mainPin.removeEventListener('mouseup', activatePage);
    window.pin.showPinsOnMap(window.backend.load(data));
  };
  /**
   * Функция активации страницы при клике на главную метку
   */
  window.variables.mainPin.addEventListener('mouseup', activatePage);
  window.map = {
    activatePage: activatePage,
    deactivePage: deactivePage,
    setAddressCoords: setAddressCoords
  };
})();
