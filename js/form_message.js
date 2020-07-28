'use strict';

(function () {
  var hideFormMessage = function (messageElement) {
    if (window.form.tagMain.lastChild === messageElement) {
      window.form.tagMain.removeChild(messageElement);
    }
  };

  var onFormMessageEscPress = function (evt, messageElement) {
    window.util.onEscPress(evt, function () {
      hideFormMessage(messageElement);
    });
  };

  var onFormMessageMousePress = function (evt, messageElement) {
    if (evt.button === window.main.MouseButtons.LEFT) {
      hideFormMessage(messageElement);
    }
  };

  window.formMessage = {
    onFormMessageEscPress: onFormMessageEscPress,
    onFormMessageMousePress: onFormMessageMousePress
  };
})();
