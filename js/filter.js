// filter.js
'use strict';
(function () {
  /**
   *  Фильтрует объявления и создает массив отфильтрованных объявлений
   * @param {Array} data - объект
   * @param {object} dataParam -type of filter
   * @param {string} value - value of currentFiler
   * @return{Array} data - отфильтрованый массив
  //  */
  var getFilteredData = function (data, dataParam, value) {
    return (data.filter(function (it) {
      return it.offer[dataParam] === value;
    }));
  };
  window.filter = {
    getFilteredData: getFilteredData
  };
})();
