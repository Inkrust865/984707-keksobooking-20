'use strict';

(function () {
  var bookingPin = {
    onTypeChange: function (type) {
      return type;
    }
  };

  var selectPinType = document.querySelector('select[name="housing-type"]');
  var selectPinPrice = document.querySelector('select[name="housing-price"]');
  var selectPinRooms = document.querySelector('select[name="housing-rooms"]');
  var selectPinGuests = document.querySelector('select[name="housing-guests"]');

  var nullifyFilter = function () {
    window.updatePinsList.mapPins = document.querySelector(window.ClassNames.mapPins);
    var mapPinList = window.updatePinsList.mapPins.querySelectorAll(window.ClassNames.mapPin);

    Array.from(mapPinList).forEach(function (pin) {
      if (!pin.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.mainPin))) {
        window.updatePinsList.mapPins.removeChild(pin);
      }
    });

    window.form.hideCard();
  };

  window.filter = {
    setupPinTypeClick: function () {
      nullifyFilter();
      bookingPin.onTypeChange(selectPinType.value);
    },
    setupPinPriceClick: function () {
      nullifyFilter();
    },
    setupPinRoomsClick: function () {
      nullifyFilter();
    },
    setupPinGuestsClick: function () {
      nullifyFilter();
    }
  };

  selectPinType.addEventListener('change', window.filter.setupPinTypeClick);
  selectPinPrice.addEventListener('change', window.filter.setupPinPriceClick);
  selectPinRooms.addEventListener('change', window.filter.setupPinRoomsClick);
  selectPinGuests.addEventListener('change', window.filter.setupPinGuestsClick);

  window.filter.bookingPin = bookingPin;
  return window.filter.bookingPin;
})();
