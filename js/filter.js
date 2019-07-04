// map-manage.js
'use strict';
(function () {
  if (window.variables.housingType.value !== 'any') {
    var pinFilter = window.map.pins.filter(function (item) {
      return item.pinFilter.type === window.variables.housingType.value;
    });
  }
  window.filter = {
    pinFilter: pinFilter
  };

})();
