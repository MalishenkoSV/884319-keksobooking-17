// filter.js
'use strict';
(function () {
  var adverts = [];
  /**
   * Функция  фильтрации пинов при изменении поля жилья
   */
  var filterPins = function () {
    window.variables.filtersHouse.addEventListener('change', function () {
      if (window.variables.housingType.value !== 'any') {
        window.pins.showPinsOnMap(adverts.slice().filter(function (item) {
          return item.pinFilter.type === window.variables.housingType.value;
        }));
      }
    });
  };
  // window.ads.filter(typeFilter).filter(numRoomsFilter).filter(numGuestsFilter)
  //     .filter(numPricesFilter).filter(featuresFilter).slice(0, MAX_NUM_PINS).forEach(function (ads) { ......
  window.filter = {
    filterPins: filterPins,
    adverts: adverts
  };
})();
