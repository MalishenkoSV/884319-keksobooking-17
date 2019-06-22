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
   * Функция активации страницы
   * активация формы
   * разблокирование полей формы
   * определение координаты метки
   * активация страницы по клику
   */
  var activatePage = function () {
    window.form.formActive();
    window.pins.showPinsOnMap(window.offer.get());
    window.variables.fieldsetList.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
    setAddressCoords(window.variables.MAP_WIDTH / 2, window.variables.MAP_HEIGTH_MAX / 2);
    window.variables.mainPin.removeEventListener('mouseup', activatePage);
  };

  /**
   * Функция активации страницы при клике на главную метку
   */
  window.variables.mainPin.addEventListener('mouseup', activatePage);
  window.map = {
    activatePage: activatePage,
    setAddressCoords: setAddressCoords
  };
})();
