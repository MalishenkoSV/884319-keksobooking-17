// variables.js
'use strict';
(function () {
  var MAX_NUM_PINS = 5;
  var map = document.querySelector('.map');
  var pin = map.querySelector('.map__pin');
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TYPES = ['place', 'flat', 'house', 'bungalo'];
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var formAddress = document.querySelector('.ad-form');
  var resetForm = formAddress.querySelector('.ad-form__reset');
  var button = formAddress.querySelector('.ad-form__submit');
  window.variables = {
    TYPES: TYPES,
    TITLES: TITLES,
    CHECKIN_TIME: CHECKIN_TIME,
    CHECKOUT_TIME: CHECKOUT_TIME,
    MAX_NUM_PINS: MAX_NUM_PINS,
    FEATURES: FEATURES,
    formAddress: formAddress,
    button: button,
    resetForm: resetForm,
    map: map,
    pin: pin
  };
})();
