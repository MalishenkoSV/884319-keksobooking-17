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
    /**
   * Создает рандомное массив
   * @param {array} arr -- массив
   * @return {array} arr
   */
  var shuffleArray = function (arr) {
    return arr.slice().sort(function () {
      return Math.random() - 0.5;
    });
  };

    /**
   * Создает рандомный массив из массива
   * @param {array} arr -- массив
   * @return {array} arr
   */
  var getRandomSubarray = function (arr) {
    var shuffledArray = shuffleArray(arr);
    var randomEndIndex = getRandomFromInterval(1, arr.length - 1);
    return shuffledArray.slice(0, randomEndIndex);
  };

  window.util = {
    getRandomFromInterval: getRandomFromInterval,
    getRandomElementFromArray: getRandomElementFromArray,
    getRandomSubarray: getRandomSubarray,

  };
})();
