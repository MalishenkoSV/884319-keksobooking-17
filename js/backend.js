// backend.js
'use strict';
(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var TIMEOUT_LOAD = 1000;
  var STATUS_LOAD = 200;
  var setupXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_LOAD) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', onError);
    xhr.addEventListener('timeout', onError);
    xhr.timeout = TIMEOUT_LOAD;
    return xhr;
  };
  var load = function (onLoad, onError) {
    var xhr = setupXhr(onLoad, onError);
    xhr.open('GET', URL_GET);
    xhr.send();
  };
  var save = function (data, onLoad, onError) {
    var xhr = setupXhr(onLoad, onError);
    xhr.open('POST', URL_POST);
    xhr.send(data);
  };
  window.backend = {
    load: load,
    save: save
  };
})();
