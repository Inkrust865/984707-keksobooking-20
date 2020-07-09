'use strict';

(function () {
  window.onError = function () {
    var errorMessageTemplate = document.querySelector('#error')
      .content
      .querySelector(window.ClassNames.error);
    var errorMessage = errorMessageTemplate.cloneNode(true);

    document.body.insertAdjacentElement('afterbegin', errorMessage);
  };
})();
