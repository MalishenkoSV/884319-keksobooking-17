'use strict';
//  drag.js
var MAP_WIDTH = 1200;
var MAP_HEIGTH_MIN = 130;
var MAP_HEIGTH = 630;
var MAP_HEIGTH_MAX = 750;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 81;
var border = {
  left: 0,
  right: MAP_WIDTH - MAIN_PIN_WIDTH,
  top: MAP_HEIGTH_MIN,
  bottom: MAP_HEIGTH_MAX - MAIN_PIN_HEIGHT
};
var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('mousedown', function (mousedownEvt) {
  window.activateMap.activatePage();
  var pinStatusCoords = {
    x: MAP_WIDTH / 2 - MAIN_PIN_WIDTH / 2,
    y: MAP_HEIGTH / 2 - MAIN_PIN_HEIGHT
  };

  var startCoords = {
    x: mousedownEvt.clientX,
    y: mousedownEvt.clientY
  };
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
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y
    };
    if (pinCoords.x >= border.left && pinCoords.x <= border.right) {
      mainPin.style.left = pinCoords.x + 'px';
      pinStatusCoords.x = pinCoords.x + MAIN_PIN_WIDTH / 2;
    }
    if (pinCoords.y >= border.top && pinCoords.y <= border.bottom) {
      mainPin.style.top = pinCoords.y + 'px';
      pinStatusCoords.y = pinCoords.y + MAIN_PIN_HEIGHT;
    }
    window.activateMap.setAddressCoords(pinStatusCoords.x, pinStatusCoords.y);
  };
  var onMouseUp = function () {
    window.activateMap.setAddressCoords(pinStatusCoords.x, pinStatusCoords.y);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
