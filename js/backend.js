// backend.js
'use strict';
(function () {
  var TIMEOUT_LOAD = 1000;
  var statusLoad = 200;
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var setupXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === statusLoad) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
      xhr.addEventListener('error', onError);
      xhr.addEventListener('timeout', onError);
      xhr.timeout = TIMEOUT_LOAD;
    });
  };
  var load = function (xhr) {
    setupXhr();
    xhr.open('GET', URL_GET);
    xhr.send();
  };
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var save = function (data, xhr) {
    setupXhr();
    xhr.open('POST', URL_POST);
    xhr.send(data);
  };
  window.backend = {
    load: load,
    save: save
  };
})();
