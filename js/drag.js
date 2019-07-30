//  drag.js
'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH_MIN = 130;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 81;
  var MAP_HEIGTH_MAX = 750;
  var Border = {
    LEFT: 0,
    RIGHT: MAP_WIDTH - MAIN_PIN_WIDTH,
    TOP: MAP_HEIGTH_MIN,
    BOTTOM: MAP_HEIGTH_MAX - MAIN_PIN_HEIGHT
  };
  /**
   * Функция определения движения при нажатии мыши
   * @param {'mousedown'} нажатие
   * @param {object} mousedownEvt - начальные координаты
   */
  mainPin.addEventListener('mousedown', function (mousedownEvt) {
    window.map.activatePage();
    var pinStatusCoords = {
      x: MAP_WIDTH / 2 - MAIN_PIN_WIDTH / 2,
      y: MAP_HEIGTH_MAX / 2 - MAIN_PIN_HEIGHT
    };
    var startCoords = {
      x: mousedownEvt.clientX,
      y: mousedownEvt.clientY
    };

    /**
     * Функция движения и координаты смещения
     * @param {object}  mouseMoveEvt нажатие
     */
    var onMouseMove = function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();

      var shift = {
        x: startCoords.x - mouseMoveEvt.clientX,
        y: startCoords.y - mouseMoveEvt.clientY
      };

      startCoords = {
        x: mouseMoveEvt.clientX,
        y: mouseMoveEvt.clientY
      };

      var pinCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      /**
       * Определение ограничений пина и координаты пина
       * @param {object}  mouseMoveEvt нажатие
       */
      if (pinCoords.x >= Border.LEFT && pinCoords.x <= Border.RIGHT) {
        mainPin.style.left = pinCoords.x + 'px';
        pinStatusCoords.x = pinCoords.x + MAIN_PIN_WIDTH / 2;
      }
      if (pinCoords.y >= Border.TOP && pinCoords.y <= Border.BOTTOM) {
        mainPin.style.top = pinCoords.y + 'px';
        pinStatusCoords.y = pinCoords.y + MAIN_PIN_HEIGHT;
      }
      window.map.setAddressCoords(pinStatusCoords.x, pinStatusCoords.y);
    };
      /**
       * Функция поднятия руки с мышки и прекращение движения
       * определение координат пина и удаление обработчиков
       * добавление обработчиковll
       */
    var onMouseUp = function () {
      window.map.setAddressCoords(pinStatusCoords.x, pinStatusCoords.y);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
