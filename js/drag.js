//  drag.js
'use strict';
(function () {
  /**
   * Функция определения движения при нажатии мыши
   * @param {'mousedown'} нажатие
   * @param {object} mousedownEvt - начальные координаты
   */
  window.variables.mainPin.addEventListener('mousedown', function (mousedownEvt) {
    window.map.activatePage();
    var pinStatusCoords = {
      x: window.variables.MAP_WIDTH / 2 - window.variables.MAIN_PIN_WIDTH / 2,
      y: window.variables.MAP_HEIGTH / 2 - window.variables.MAIN_PIN_HEIGHT
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
      var shift = {
        x: startCoords.x - mouseMoveEvt.clientX,
        y: startCoords.y - mouseMoveEvt.clientY
      };

      startCoords = {
        x: mouseMoveEvt.clientX,
        y: mouseMoveEvt.clientY
      };

      var pinCoords = {
        x: window.variables.mainPin.offsetLeft - shift.x,
        y: window.variables.mainPin.offsetTop - shift.y
      };

      /**
     * Определение ограничений пина и координаты пина
     * @param {object}  mouseMoveEvt нажатие
     */
      if (pinCoords.x >= window.variables.Border.LEFT && pinCoords.x <= window.variables.Border.RIGHT) {
        window.variables.mainPin.style.left = pinCoords.x + 'px';
        pinStatusCoords.x = pinCoords.x + window.variables.MAIN_PIN_WIDTH / 2;
      }
      if (pinCoords.y >= window.variables.Border.TOP && pinCoords.y <= window.variables.Border.BOTTOM) {
        window.variables.mainPin.style.top = pinCoords.y + 'px';
        pinStatusCoords.y = pinCoords.y + window.variables.MAIN_PIN_HEIGHT;
      }
      window.activateMap.setAddressCoords(pinStatusCoords.x, pinStatusCoords.y);
    };
      /**
       * Функция поднятия руки с мышки и прекращение движения
       * определение координат пина и удаление обработчиков
       * добавление обработчиков
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
