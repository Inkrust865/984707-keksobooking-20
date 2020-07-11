'use strict';

(function () {
  window.error = {
    onError: function () {
      window.formMessage.renderErrorMessage();

      document.addEventListener('keydown', window.formMessage.onErrorMessageEscPress);
      document.addEventListener('click', window.formMessage.onErrorMessageMousePress);
    }
  };
})();
