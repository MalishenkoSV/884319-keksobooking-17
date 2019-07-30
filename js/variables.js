// variables.js
'use strict';
(function () {
  var map = document.querySelector('.map');
  var pin = map.querySelector('.map__pin');
  var formAddress = document.querySelector('.ad-form');
  var resetForm = formAddress.querySelector('.ad-form__reset');
  var button = formAddress.querySelector('.ad-form__submit');
  window.variables = {
    formAddress: formAddress,
    button: button,
    resetForm: resetForm,
    map: map,
    pin: pin
  };
})();
