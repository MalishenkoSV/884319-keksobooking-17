'use strict';
// popup.js
(function () {
    var disableForm = function (list, newStatus) {
    Array.from(list).forEach(function (listElement) {
      listElement.disabled = newStatus;
    });
  };
    {var onEnterKeyDownActiveMap = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.form.setAddressCoords(pinStatusCoordsInit.x, pinStatusCoordsInit.y);
      onMapActive();
    }
    mainPin.removeEventListener('keydown', onEnterKeyDownActiveMap);
  };}
    var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };
    })();
