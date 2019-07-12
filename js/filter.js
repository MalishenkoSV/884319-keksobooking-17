// filter.js
'use strict';
(function () {
  /**
   * Функция  фильтрации пинов при изменении поля жилья
   * @param{array} adverts - обїявления
   */
  var filterPins = function (adverts) {
    var selectedFeatures = [];
    window.variables.housingFeature.forEach(function (item) {
      if (item.checked) {
        selectedFeatures.push(item.value);
      }
    });
    var advertOffer = adverts.filter(function (item) {
      return 'offer' in item;
    });
    if (window.variables.housingType.value !== 'any') {
      advertOffer.filter(function (item) {
        return item.type === window.variables.housingType.value;
      });
    }
  };
  // window.ads.filter(typeFilter).filter(numRoomsFilter).filter(numGuestsFilter)
  //     .filter(numPricesFilter).filter(featuresFilter).slice(0, MAX_NUM_PINS).forEach(function (ads) { ......
  window.filter = {
    filterPins: filterPins
  };
})();
