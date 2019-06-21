// util.js
'use strict';
(function () {
  /**
 * Создает рандомное число
 * @param {number} min — минимальное число
 * @param {number} max - максимальное число
 */

  var getRandomFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
* Создает рандомное число из массива
* @param {array} arr -- массив
* @return {array} arr
*/
  var getRandomElementFromArray = function (arr) {
    return arr[getRandomFromInterval(0, arr.length - 1)];
  };

  window.util = {
    getRandomFromInterval: getRandomFromInterval,
    getRandomElementFromArray: getRandomElementFromArray
  };
})();
