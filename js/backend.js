// backend.js
'use strict';
(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      try {
        onLoad(xhr.response);
      } catch (err) {
        onError('Статус ответа:' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('GET', URL_GET);
    xhr.addEventListener('error', onError);
    xhr.addEventListener('timeout', onError);
    xhr.timeout = 1000;
    xhr.send();
  };
  var save = function (data, onSuccess, onError) {
    var URL_POST = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
      xhr.open('POST', URL_POST);
      xhr.send(data);
    });
    window.backend = {
      load: load,
      save: save
    };
  };
})();
