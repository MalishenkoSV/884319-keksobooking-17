// // filter.js
'use strict';
(function () {
  var PRICE_LOW = 10001;
  var PRICE_HIGH = 49999;
  var filtersContainer = document.querySelector('.map__filters');
  var filtersStateToCase = {};
  /**
   * filterByPrice - Фильтрует объявления ads по цене.
   * @param  {string} price Ценовой интервал.
   * @return {array}  ads Массив объявлений после фильтрации.
   */
  var startFiltersToCase = {
    features: function (features) {
      for (var i = 0; i < filtersStateToCase.features.length; i++) {
        if (features.indexOf(filtersStateToCase.features[i]) === -1) {
          return false;
        }
      }

      return true;
    },
    price: function (price) {
      if (filtersStateToCase.price === 'low') {
        return price < PRICE_LOW;
      }

      if (filtersStateToCase.price === 'high') {
        return price > PRICE_HIGH;
      }

      if (filtersStateToCase.price === 'middle') {
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
      filtersStateToCase[name] = value;
    } else {
      if (!filtersStateToCase[name]) {
        filtersStateToCase[name] = [];
      }

      var index = filtersStateToCase[name].indexOf(value);

      if (evt.target.checked) {
        filtersStateToCase[name].push(value);
      } else {
        filtersStateToCase[name] = [].concat(filtersStateToCase[name].slice(0, index), filtersStateToCase[name].slice(index + 1)
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
    var сheckedFiltersKeys = Object.keys(filtersStateToCase);
    var updatedAds = ads.filter(function (item) {
      var isValid = true;
      for (var i = 0; i < сheckedFiltersKeys.length; i++) {
        var key = сheckedFiltersKeys[i];
        if (filtersStateToCase[key] === 'any') {
          isValid = true;
        } else if (!item.offer[key]) {
          isValid = false;
        } else if (typeof startFiltersToCase[key] === 'function') {
          isValid = startFiltersToCase[key](item.offer[key]);
        } else {
          isValid = filtersStateToCase[key] === item.offer[key].toString();
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
