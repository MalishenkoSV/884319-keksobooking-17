// variables.js
'use strict';
(function () {
  var COUNT = 8;
  var TYPES = ['place', 'flat', 'house', 'bungalo'];
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH_MIN = 130;
  var MAP_HEIGTH = 630;
  var MAP_HEIGTH_MAX = 750;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 81;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var formAdress = document.querySelector('.ad-form');
  var typeSelect = formAdress.querySelector('#type');
  var priceSelect = formAdress.querySelector('#price');
  var timeinSelect = formAdress.querySelector('#timein');
  var timeoutSelect = formAdress.querySelector('#timeout');
  var formAddress = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapListElement = document.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var fieldsetList = formAdress.querySelectorAll('fieldset');
  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };
  var Border = {
    LEFT: 0,
    RIGHT: MAP_WIDTH - MAIN_PIN_WIDTH,
    TOP: MAP_HEIGTH_MIN,
    BOTTOM: MAP_HEIGTH_MAX - MAIN_PIN_HEIGHT
  };
  window.variables = {
    COUNT: COUNT,
    TYPES: TYPES,
    MAP_WIDTH: MAP_WIDTH,
    MAP_HEIGTH: MAP_HEIGTH,
    MAP_HEIGTH_MIN: MAP_HEIGTH_MIN,
    MAP_HEIGTH_MAX: MAP_HEIGTH_MAX,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    formAdress: formAdress,
    typeSelect: typeSelect,
    priceSelect: priceSelect,
    timeinSelect: timeinSelect,
    timeoutSelect: timeoutSelect,
    MinPrice: MinPrice,
    mainPin: mainPin,
    formAddress: formAddress,
    map: map,
    Border: Border,
    fieldsetList: fieldsetList,
    pinTemplate: pinTemplate,
    mapListElement: mapListElement
  };
})();
