'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector(window.ClassNames.mapPin);

  window.pin = {
    Pin: {
      X: 25,
      Y: 70
    },
    renderBookingPin: function (index) {
      var bookingPin = mapPinTemplate.cloneNode(true);
      var pinImg = bookingPin.querySelector('img');

      pinImg.src = window.updatePinsList.newPinsList[index].author.avatar;
      pinImg.alt = 'Заголовок объявления';
      bookingPin.style.left = window.mapFile.getLocationX(index) + 'px';
      bookingPin.style.top = window.mapFile.getLocationY(index) + 'px';

      return bookingPin;
    }
  };
})();
