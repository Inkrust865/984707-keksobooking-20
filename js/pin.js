'use strict';

(function () {
  var pin = {
    x: 25,
    y: 70
  };

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector(window.ClassNames.MAP_PIN);

  var getLocationX = function (index) {
    return window.pinsList.newPinsList[index].location.x - pin.x;
  };

  var getLocationY = function (index) {
    return window.pinsList.newPinsList[index].location.y - pin.y;
  };

  var renderBookingPin = function (index) {
    var bookingPin = mapPinTemplate.cloneNode(true);
    var pinImg = bookingPin.querySelector('img');
    pinImg.src = window.pinsList.newPinsList[index].author.avatar;
    pinImg.alt = 'Заголовок объявления';
    bookingPin.style.left = getLocationX(index) + 'px';
    bookingPin.style.top = getLocationY(index) + 'px';
    return bookingPin;
  };

  window.pin = {
    renderBookingPin: renderBookingPin
  };
})();
