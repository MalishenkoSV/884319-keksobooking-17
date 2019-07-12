// backend.js
'use strict';
(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var setupXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === window.variables.STATUS_LOAD) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', onError);
    xhr.addEventListener('timeout', onError);
    xhr.timeout = window.variables.TIMEOUT_LOAD;
    return xhr;
  };
  var load = function (onLoad, onError) {
    var xhr = setupXhr(onLoad, onError);
    xhr.open('GET', URL_GET);
    xhr.send();
  };
  var URL_POST = 'https://js.dump.academy/keksobooking';
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
