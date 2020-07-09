'use strict';

(function () {
  var urlLoad = 'https://javascript.pages.academy/keksobooking/data';
  var urlPublish = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var renderXHR = function (method, url, sendData, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send(sendData);
  };

  window.backend = {
    load: function (onLoad, onError) {
      renderXHR('GET', urlLoad, '', onLoad, onError);
    },
    publish: function (data, onLoad, onError) {
      renderXHR('POST', urlPublish, data, onLoad, onError);
    }
  };
})();
