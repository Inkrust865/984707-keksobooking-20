'use strict';

(function () {
  var PriceBorders = {
    MIN: 10000,
    MAX: 50000
  };

  var filterForm = document.querySelector(window.ClassNames.MAP_FILTERS);
  var checkboxWrapper = document.querySelector(window.ClassNames.CHECKBOX_FEATURES_WRAPPER);
  var selectPinType = document.querySelector('select[name="housing-type"]');
  var selectPinPrice = document.querySelector('select[name="housing-price"]');
  var selectPinRooms = document.querySelector('select[name="housing-rooms"]');
  var selectPinGuests = document.querySelector('select[name="housing-guests"]');

  var filterList = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-guests': 'any',
    'housing-rooms': 'any'
  };
  var checkboxFilterList = {
    parking: false,
    washer: false,
    elevator: false,
    dishwasher: false,
    wifi: false,
    conditioner: false
  };

  var resetFilter = function () {
    filterForm.reset();
    nullifyFilter();

    var startingValueFilters = [
      {filterList: filterList, filterValue: 'any'},
      {filterList: checkboxFilterList, filterValue: false}
    ];

    var resetFilterValues = function (filtersList, filterValue) {
      var filterNames = Object.keys(filtersList);

      filterNames.forEach(function (filterName) {
        filtersList[filterName] = filterValue;
      });
    };

    startingValueFilters.forEach(function (filter) {
      resetFilterValues(filter.filterList, filter.filterValue);
    });

    window.pinsList.updateBookingPins();
  };

  var updateFilterList = function (filter, value) {
    filterList[filter] = value;
  };

  var updateCheckboxFilterList = function (filter) {
    checkboxFilterList[filter] = !checkboxFilterList[filter];
  };

  var onSelectChange = function (evt) {
    window.filter.updateFilterList(evt.target.id, evt.target.value);
    nullifyFilter();
    window.pinsList.updateBookingPins();
  };

  var onCheckBoxWrapperClick = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'input') {
      updateCheckboxFilterList(evt.target.value);
      nullifyFilter();
      window.pinsList.updateBookingPins();
    }
  };

  var nullifyFilter = function () {
    window.pinsList.mapPins = document.querySelector(window.ClassNames.MAP_PINS);
    var mapPinList = window.pinsList.mapPins.querySelectorAll(window.ClassNames.MAP_PIN);

    Array.from(mapPinList).forEach(function (pin) {
      if (!pin.classList.contains(window.util.getClassWithoutPoint(window.ClassNames.MAIN_PIN))) {
        window.pinsList.mapPins.removeChild(pin);
      }
    });

    window.card.hideCard();
  };

  var typeUpdate = function (pin, filterType, filterStatus) {
    return pin.offer.type === filterStatus;
  };

  var priceUpdate = function (pin, filterType, filterStatus) {
    switch (filterStatus) {
      case 'low':
        if (pin.offer.price >= PriceBorders.MIN) {
          return false;
        }
        break;
      case 'middle':
        if (pin.offer.price < PriceBorders.MIN || pin.offer.price > PriceBorders.MAX) {
          return false;
        }
        break;
      case 'high':
        if (pin.offer.price <= PriceBorders.MAX) {
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

  var filterUpdateCallbacks = {
    'housing-type': typeUpdate,
    'housing-price': priceUpdate,
    'housing-guests': roomsGuestsUpdate,
    'housing-rooms': roomsGuestsUpdate
  };

  checkboxWrapper.addEventListener('click', onCheckBoxWrapperClick);
  selectPinType.addEventListener('change', onSelectChange);
  selectPinPrice.addEventListener('change', onSelectChange);
  selectPinRooms.addEventListener('change', onSelectChange);
  selectPinGuests.addEventListener('change', onSelectChange);

  window.filter = {
    filterForm: filterForm,
    filterList: filterList,
    filterUpdateCallbacks: filterUpdateCallbacks,
    checkboxFilterList: checkboxFilterList,
    resetFilter: resetFilter,
    updateFilterList: updateFilterList,
    updateCheckboxFilterList: updateCheckboxFilterList
  };
})();
