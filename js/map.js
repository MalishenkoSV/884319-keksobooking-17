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
    window.variables.mapListElement.classList.add('map--faded');
    window.variables.formAddress.classList.add('ad-form--disabled');
    window.variables.сards.forEach(function (element) {
      if (!element.classList.contains('hidden')) {
        element.classList.add('hidden');
      }
    });
    window.variables.resetPage.addEventListener('click', deactivePage);
  };

  /**
   * Функция активации страницы при клике на главную метку
   */
  var adverts = [];
  var activatePage = function () {
    window.form.activeForm();
    window.variables.fieldsetList.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
    var onLoad = function (data) {
      adverts.push(data);
      for (var i = 0; i < window.variables.NUMBER_PINS; i++) {
        var offers = [];
        offers.push(adverts);
      }
      window.pin.showPinOnMap(offers);
    };
    window.backend.load(onLoad, window.error.onError);
    setAddressCoords(window.variables.MAP_WIDTH / 2, window.variables.MAP_HEIGTH / 2);
    window.variables.mainPin.removeEventListener('mouseup', activatePage);
  };
  window.variables.mainPin.addEventListener('mouseup', activatePage);
  window.map = {
    activate: activatePage,
    deactive: deactivePage,
    setAddressCoords: setAddressCoords
  };
})();
