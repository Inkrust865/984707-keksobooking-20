'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector(window.ClassNames.mapPin);

  window.pin = {
    renderBookingPin: function (index) {
      var bookingPin = mapPinTemplate.cloneNode(true);
      var pinImg = bookingPin.querySelector('img');

      pinImg.src = window.data.getAvatar(index);
      pinImg.alt = 'Заголовок объявления';
      bookingPin.style.left = window.data.getLocationX() + 'px';
      bookingPin.style.top = window.data.getLocationY() + 'px';

      return bookingPin;
    }
  };
})();
