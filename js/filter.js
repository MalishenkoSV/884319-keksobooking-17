// // filter.js
'use strict';
(function () {
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;
  var filtersContainer = document.querySelector('.map__filters');
  var filtersState = {};
  /**
   * filterByPrice - Фильтрует объявления ads по цене.
   * @param  {string} price Ценовой интервал.
   * @return {array}  ads Массив объявлений после фильтрации.
   */
  var startFilters = {
    features: function (features) {
      for (var i = 0; i < filtersState.features.length; i++) {
        if (features.indexOf(filtersState.features[i]) === -1) {
          return false;
        }
      }

      return true;
    },
    price: function (price) {
      if (filtersState.price === 'low') {
        return price < PRICE_LOW;
      }

      if (filtersState.price === 'high') {
        return price > PRICE_HIGH;
      }

      if (filtersState.price === 'middle') {
        return price > PRICE_LOW && price < PRICE_HIGH;
      }

      return true;
    }
  };
  /**
   * Изменения на фильтре
   * @param  {object} evt
   */
  var onFiltersChange = function (evt) {
    var name = evt.target.name.replace('housing-', '');
    var value = evt.target.value;

    if (evt.target.type !== 'checkbox') {
      filtersState[name] = value;
    } else {
      if (!filtersState[name]) {
        filtersState[name] = [];
      }

      var index = filtersState[name].indexOf(value);

      if (evt.target.checked) {
        filtersState[name].push(value);
      } else {
        filtersState[name] = [].concat(filtersState[name].slice(0, index), filtersState[name].slice(index + 1)
        );
      }
    }
  };
  filtersContainer.addEventListener('change', onFiltersChange);
  /**
   * filterByPrice - Фильтрует объявления ads по цене.
   * @param  {Array} ads массив объявлений
   * @return {Array}  updatedAds Массив объявлений после фильтрации.
   */
  var applyFilters = function (ads) {
    var updatedAds = ads.slice();
    var mixAds = window.util.mixArray(updatedAds);
    var keysToCheck = Object.keys(filtersState);

    updatedAds = mixAds.filter(function (item) {
      var isValid = true;

      for (var i = 0; i < keysToCheck.length; i++) {
        var key = keysToCheck[i];

        if (filtersState[key] === 'any') {
          isValid = true;
        } else if (!item.offer[key]) {
          isValid = false;
        } else if (typeof startFilters[key] === 'function') {
          isValid = startFilters[key](item.offer[key]);
        } else {
          isValid = filtersState[key] === item.offer[key].toString();
        }

        if (!isValid) {
          break;
        }
      }
      return isValid;
    });

    return updatedAds;
  };


  window.filter = {
    onFiltersChange: onFiltersChange,
    applyFilters: applyFilters
  };
})();
