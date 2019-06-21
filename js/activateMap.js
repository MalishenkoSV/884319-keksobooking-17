// activateMap.js
'use strict';
(function () {
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH_MAX = 750;
  var mainPin = document.querySelector('.map__pin--main');
  var formAdress = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  /**
 *  Блокировка полей
 */
  var fieldsetList = formAdress.querySelectorAll('fieldset');
  fieldsetList.forEach(function () {
    fieldsetList.disabled = true;
  });
  /**
* Функция активации карты
* удаление класса деактивации
* удаления класса деактивации полей формы
*/
  var formActive = function () {
    map.classList.remove('map--faded');
    formAdress.classList.remove('ad-form--disabled');
  };

  /**
* Функция определения координат адресса метки
* @param {number} x -- координата по горизонтали
* @param {number} y -- координата по вертикали
*/
  var setAddressCoords = function (x, y) {
    formAdress.querySelector('#address').value = x + ', ' + y;
  };

  /**
* Функция активации страницы
* активация формы
* разблокирование полей формы
* определение координаты метки
* активация страницы по клику
*/
  var activatePage = function () {
    formActive();
    window.pins.showPinsOnMap(window.ads.getAdverts());
    fieldsetList.forEach(function () {
      fieldsetList.disabled = false;
    });
    setAddressCoords(MAP_WIDTH / 2, MAP_HEIGTH_MAX / 2);
    mainPin.removeEventListener('mouseup', activatePage);
  };

  /**
* Функция активации страницы при клике на главную метку
*/
  mainPin.addEventListener('mouseup', activatePage);
  window.activateMap = {
    activatePage: activatePage,
    setAddressCoords: setAddressCoords
  };
})();
