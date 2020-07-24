'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
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
    setupFilterCheckboxClick: window.debounce(function () {
      nullifyFilter();
      window.updatePinsList.updateBookingPins();
    }),
    resetFilter: function () {
      filterForm.reset();
      nullifyFilter();
      window.updatePinsList.pinType = 'any';
      window.updatePinsList.pinPrice = 'any';
      window.updatePinsList.pinRooms = 'any';
      window.updatePinsList.pinGuests = 'any';
      window.updatePinsList.updateBookingPins();
    }
  };

  window.filter.selectPinType.addEventListener('change', window.filter.setupPinTypeClick);
  window.filter.selectPinPrice.addEventListener('change', window.filter.setupPinPriceClick);
  window.filter.selectPinRooms.addEventListener('change', window.filter.setupPinRoomsClick);
  window.filter.selectPinGuests.addEventListener('change', window.filter.setupPinGuestsClick);
  window.filter.checkboxWifi.addEventListener('change', window.filter.setupFilterCheckboxClick);
  window.filter.checkboxDishwasher.addEventListener('change', window.filter.setupFilterCheckboxClick);
  window.filter.checkboxParking.addEventListener('change', window.filter.setupFilterCheckboxClick);
  window.filter.checkboxWasher.addEventListener('change', window.filter.setupFilterCheckboxClick);
  window.filter.checkboxElevator.addEventListener('change', window.filter.setupFilterCheckboxClick);
  window.filter.checkboxConditioner.addEventListener('change', window.filter.setupFilterCheckboxClick);

  window.filter.bookingPin = bookingPin;
  return window.filter.bookingPin;
})();
