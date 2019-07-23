// filter.js
'use strict';
(function () {
  /**
   *  Фильтрует объявления и создает массив отфильтрованных объявлений
   * @param {object} data - объект
   * @param {object} dataParam
   * @param {object} value
   * @return{} копию объекта
  //  */
  var getFilteredData = function (data, dataParam, value) {
    if (value !== undefined) {
      return (data.filter(function (it) {
        return it.offer[dataParam] === value;
      }));
    } else {
      return data.slice(0, 5);
    }
  };
  window.filter = {
    getFilteredData: getFilteredData
  };
})();
