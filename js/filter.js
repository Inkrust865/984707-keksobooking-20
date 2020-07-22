'use strict';

(function () {
  var bookingPin = {
    onTypeChange: function (type) {
      return type;
    },
    onPriceChange: function (price) {
      return price;
    },
    onRoomsChange: function (rooms) {
      return rooms;
    },
    onGuestsChange: function (guests) {
      return guests;
    },
    onWifiChange: function () {
      return;
    },
    onDishwasherChange: function () {
      return;
    },
    onParkingChange: function () {
      return;
    },
    onWasherChange: function () {
      return;
    },
    onElevatorChange: function () {
      return;
    },
    onConditionerChange: function () {
      return;
    }
  };


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
    selectPinType: document.querySelector('select[name="housing-type"]'),
    selectPinPrice: document.querySelector('select[name="housing-price"]'),
    selectPinRooms: document.querySelector('select[name="housing-rooms"]'),
    selectPinGuests: document.querySelector('select[name="housing-guests"]'),
    checkboxWifi: document.querySelector('#filter-wifi'),
    checkboxDishwasher: document.querySelector('#filter-dishwasher'),
    checkboxParking: document.querySelector('#filter-parking'),
    checkboxWasher: document.querySelector('#filter-washer'),
    checkboxElevator: document.querySelector('#filter-elevator'),
    checkboxConditioner: document.querySelector('#filter-conditioner'),
    setupPinTypeClick: function () {
      nullifyFilter();
      bookingPin.onTypeChange(window.filter.selectPinType.value);
    },
    setupPinPriceClick: function () {
      nullifyFilter();
      bookingPin.onPriceChange(window.filter.selectPinPrice.value);
    },
    setupPinRoomsClick: function () {
      nullifyFilter();
      bookingPin.onRoomsChange(window.filter.selectPinRooms.value);
    },
    setupPinGuestsClick: function () {
      nullifyFilter();
      bookingPin.onGuestsChange(window.filter.selectPinGuests.value);
    },
    setupPinWifiClick: function () {
      nullifyFilter();
      bookingPin.onWifiChange();
    },
    setupPinDishwasherClick: function () {
      nullifyFilter();
      bookingPin.onDishwasherChange();
    },
    setupPinParkingClick: function () {
      nullifyFilter();
      bookingPin.onParkingChange();
    },
    setupPinWasherClick: function () {
      nullifyFilter();
      bookingPin.onWasherChange();
    },
    setupPinElevatorClick: function () {
      nullifyFilter();
      bookingPin.onElevatorChange();
    },
    setupPinConditionerClick: function () {
      nullifyFilter();
      bookingPin.onConditionerChange();
    }
  };

  window.filter.selectPinType.addEventListener('change', window.filter.setupPinTypeClick);
  window.filter.selectPinPrice.addEventListener('change', window.filter.setupPinPriceClick);
  window.filter.selectPinRooms.addEventListener('change', window.filter.setupPinRoomsClick);
  window.filter.selectPinGuests.addEventListener('change', window.filter.setupPinGuestsClick);
  window.filter.checkboxWifi.addEventListener('change', window.filter.setupPinWifiClick);
  window.filter.checkboxDishwasher.addEventListener('change', window.filter.setupPinDishwasherClick);
  window.filter.checkboxParking.addEventListener('change', window.filter.setupPinParkingClick);
  window.filter.checkboxWasher.addEventListener('change', window.filter.setupPinWasherClick);
  window.filter.checkboxElevator.addEventListener('change', window.filter.setupPinElevatorClick);
  window.filter.checkboxConditioner.addEventListener('change', window.filter.setupPinConditionerClick);

  window.filter.bookingPin = bookingPin;
  return window.filter.bookingPin;
})();
