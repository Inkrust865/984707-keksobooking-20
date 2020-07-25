'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');

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

  var typeUpdate = function (pin, filterType, filterStatus) {
    return pin.offer.type === filterStatus;
  };
  var priceUpdate = function (pin, filterType, filterStatus) {
    switch (filterStatus) {
      case 'low':
        if (pin.offer.price >= 10000) {
          return false;
        }
        break;
      case 'middle':
        if (pin.offer.price < 10000 || pin.offer.price > 50000) {
          return false;
        }
        break;
      case 'high':
        if (pin.offer.price < 50000) {
          return false;
        }
        break;
    }

    return true;
  };
  var roomsGuestsUpdate = function (pin, filterType, filterStatus) {
    var OFFER_TYPE = filterType.split('housing-')[1];

    return pin.offer[OFFER_TYPE] === parseInt(filterStatus, 10);
  };

  window.filter = {
    filterList: {
      'housing-type': 'any',
      'housing-price': 'any',
      'housing-guests': 'any',
      'housing-rooms': 'any'
    },
    filterUpdateCallbacks: {
      'housing-type': typeUpdate,
      'housing-price': priceUpdate,
      'housing-guests': roomsGuestsUpdate,
      'housing-rooms': roomsGuestsUpdate
    },
    checkboxFilterList: {
      parking: false,
      washer: false,
      elevator: false,
      dishwasher: false,
      wifi: false,
      conditioner: false
    },
    checkboxWrapper: document.querySelector(window.ClassNames.checkBoxFeaturesWrapper),
    selectPinType: document.querySelector('select[name="housing-type"]'),
    selectPinPrice: document.querySelector('select[name="housing-price"]'),
    selectPinRooms: document.querySelector('select[name="housing-rooms"]'),
    selectPinGuests: document.querySelector('select[name="housing-guests"]'),

    onSelectChange: function (evt) {
      window.filter.updateFilterList(evt.target.id, evt.target.value);
      nullifyFilter();
      window.updatePinsList.updateBookingPins();
    },
    onCheckBoxWrapperClick: function (evt) {
      if (evt.target.tagName.toLowerCase() === 'input') {
        window.filter.updateCheckboxFilterList(evt.target.value);
        nullifyFilter();
        window.updatePinsList.updateBookingPins();
      }
    },
    resetFilter: function () {
      filterForm.reset();
      nullifyFilter();
      window.updatePinsList.pinType = 'any';
      window.updatePinsList.pinPrice = 'any';
      window.updatePinsList.pinRooms = 'any';
      window.updatePinsList.pinGuests = 'any';
      window.updatePinsList.updateBookingPins();
    },
    updateFilterList: function (filter, value) {
      window.filter.filterList[filter] = value;
    },
    updateCheckboxFilterList: function (filter) {
      window.filter.checkboxFilterList[filter] = !window.filter.checkboxFilterList[filter];
    }
  };

  window.filter.checkboxWrapper.addEventListener('click', window.filter.onCheckBoxWrapperClick);
  window.filter.selectPinType.addEventListener('change', window.filter.onSelectChange);
  window.filter.selectPinPrice.addEventListener('change', window.filter.onSelectChange);
  window.filter.selectPinRooms.addEventListener('change', window.filter.onSelectChange);
  window.filter.selectPinGuests.addEventListener('change', window.filter.onSelectChange);
})();
